/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroQuizParser from './parsers/hero-quiz.js';
import heroOfferParser from './parsers/hero-offer.js';
import storeLocatorParser from './parsers/store-locator.js';
import cardsCategoryParser from './parsers/cards-category.js';
import cardsPromoParser from './parsers/cards-promo.js';
import heroRewardParser from './parsers/hero-reward.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/frescopa-cleanup.js';
import sectionsTransformer from './transformers/frescopa-sections.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Coffee brand homepage with hero, product showcase, and brand story',
  urls: [
    'https://frescopa.coffee/'
  ],
  blocks: [
    {
      name: 'hero-quiz',
      instances: ['.teaser-container .teaser.dark.right']
    },
    {
      name: 'hero-offer',
      instances: ['.offer-container .offer.block']
    },
    {
      name: 'store-locator',
      instances: ['.store-locator-container .store-locator.block']
    },
    {
      name: 'cards-category',
      instances: ['.card-tiles.cards-container .cards.block']
    },
    {
      name: 'cards-promo',
      instances: ['.home.cards-container .cards.block']
    },
    {
      name: 'hero-reward',
      instances: ['.reward-container .reward.light.left.block']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Quiz',
      selector: '.section.teaser-container',
      style: null,
      blocks: ['hero-quiz'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Offer Banner',
      selector: '.section.offer-container',
      style: null,
      blocks: ['hero-offer'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Store Locator',
      selector: '.section.store-locator-container',
      style: null,
      blocks: ['store-locator'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Product Categories',
      selector: '.section.card-tiles.cards-container',
      style: null,
      blocks: ['cards-category'],
      defaultContent: ['.card-tiles.cards-container .default-content-wrapper h2']
    },
    {
      id: 'section-5',
      name: 'Promotional Cards',
      selector: '.section.home.cards-container',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Rewards Banner',
      selector: '.section.reward-container',
      style: null,
      blocks: ['hero-reward'],
      defaultContent: []
    }
  ]
};

// PARSER REGISTRY
const parsers = {
  'hero-quiz': heroQuizParser,
  'hero-offer': heroOfferParser,
  'store-locator': storeLocatorParser,
  'cards-category': cardsCategoryParser,
  'cards-promo': cardsPromoParser,
  'hero-reward': heroRewardParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      }
    }];
  }
};
