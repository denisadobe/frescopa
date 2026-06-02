/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-quiz.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".background img, .background picture img");
    const eyebrow = element.querySelector(".foreground .text .eyebrow, .text .eyebrow");
    const heading = element.querySelector(".foreground .text .title h1, .foreground .text .title h2, .foreground .text .title h3, .foreground .text .title h4, .text .title h1, .text .title h2, .text .title h3");
    const descriptionEl = element.querySelector(".foreground .text .long-description, .text .long-description");
    const descriptionText = descriptionEl && descriptionEl.textContent.trim();
    const ctaLinks = Array.from(element.querySelectorAll(".foreground .text .cta a, .text .cta a"));
    const cells = [];
    if (bgImage) {
      cells.push([[bgImage]]);
    }
    const contentCell = [];
    if (eyebrow) {
      contentCell.push(eyebrow);
    }
    if (heading) {
      contentCell.push(heading);
    }
    if (descriptionText) {
      contentCell.push(descriptionEl);
    }
    if (ctaLinks.length > 0) {
      contentCell.push(...ctaLinks);
    }
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-quiz", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-offer.js
  function parse2(element, { document }) {
    const image = element.querySelector(".offer-content > img, .offer-content img, img, picture img, picture");
    const heading = element.querySelector(".offer-left .headline, .offer-left h4, .offer-left h3, .offer-left h2, .offer-left h1");
    const description = element.querySelector(".offer-left .detail, .offer-left p");
    const ctaLinks = Array.from(element.querySelectorAll(".offer-right a.button, .offer-right a"));
    const cells = [];
    if (image) {
      cells.push([image]);
    }
    if (heading) {
      cells.push([heading]);
    }
    if (description) {
      cells.push([description]);
    }
    if (ctaLinks.length > 0) {
      cells.push([...ctaLinks]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-offer", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/store-locator.js
  function parse3(element, { document }) {
    const title = element.querySelector("h3.sidepanel__title, .sidepanel h3, h3");
    const searchTitle = element.querySelector("p.search__title, .search p, .search__title");
    const cells = [];
    if (title) cells.push([title]);
    if (searchTitle) cells.push([searchTitle]);
    const block = WebImporter.Blocks.createBlock(document, { name: "store-locator", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-category.js
  function parse4(element, { document }) {
    const cardItems = element.querySelectorAll(":scope ul > li");
    const cells = [];
    cardItems.forEach((item) => {
      const image = item.querySelector(".cards-card-image picture, .cards-card-image img");
      const title = item.querySelector(".cards-card-body h5, .cards-card-body h4, .cards-card-body h3, .cards-card-body h2, .cards-card-body p");
      const row = [];
      if (image) row.push(image);
      if (title) row.push(title);
      if (row.length > 0) {
        cells.push(row);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-category", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse5(element, { document }) {
    const cardItems = element.querySelectorAll(":scope ul > li");
    const cells = [];
    cardItems.forEach((card) => {
      const image = card.querySelector(".cards-card-image picture, .cards-card-image img");
      const heading = card.querySelector(".cards-card-body h1, .cards-card-body h2, .cards-card-body h3, .cards-card-body h4, .cards-card-body h5, .cards-card-body h6");
      const description = card.querySelector(".cards-card-body p:not(.button-container)");
      const ctaLink = card.querySelector(".cards-card-body .button-container a, .cards-card-body a.button");
      const imageCell = [];
      if (image) imageCell.push(image);
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (description) contentCell.push(description);
      if (ctaLink) contentCell.push(ctaLink);
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-reward.js
  function parse6(element, { document }) {
    const bgImage = element.querySelector("img");
    const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let heading = null;
    for (const h of headings) {
      if (h.textContent.trim()) {
        heading = h;
        break;
      }
    }
    const paragraphs = element.querySelectorAll(".reward-left p, p");
    let description = null;
    for (const p of paragraphs) {
      if (p.textContent.trim() && !p.querySelector("a.button")) {
        description = p;
        break;
      }
    }
    const ctaLinks = Array.from(element.querySelectorAll("a.button, a[href]"));
    const seen = /* @__PURE__ */ new Set();
    const uniqueCtaLinks = ctaLinks.filter((a) => {
      const href = a.getAttribute("href");
      if (seen.has(href)) return false;
      seen.add(href);
      return true;
    });
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    if (heading) {
      cells.push([heading]);
    }
    if (description) {
      cells.push([description]);
    }
    if (uniqueCtaLinks.length > 0) {
      cells.push(uniqueCtaLinks);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-reward", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/frescopa-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".overlay"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.header-wrapper",
        "footer.footer-wrapper"
      ]);
      const sections = element.querySelectorAll(":scope > .section");
      sections.forEach((section) => {
        if (!section.textContent.trim() && !section.querySelector("img, picture, video, iframe")) {
          section.remove();
        }
      });
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
    }
  }

  // tools/importer/transformers/frescopa-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Coffee brand homepage with hero, product showcase, and brand story",
    urls: [
      "https://frescopa.coffee/"
    ],
    blocks: [
      {
        name: "hero-quiz",
        instances: [".teaser-container .teaser.dark.right"]
      },
      {
        name: "hero-offer",
        instances: [".offer-container .offer.block"]
      },
      {
        name: "store-locator",
        instances: [".store-locator-container .store-locator.block"]
      },
      {
        name: "cards-category",
        instances: [".card-tiles.cards-container .cards.block"]
      },
      {
        name: "cards-promo",
        instances: [".home.cards-container .cards.block"]
      },
      {
        name: "hero-reward",
        instances: [".reward-container .reward.light.left.block"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Quiz",
        selector: ".section.teaser-container",
        style: null,
        blocks: ["hero-quiz"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Offer Banner",
        selector: ".section.offer-container",
        style: null,
        blocks: ["hero-offer"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Store Locator",
        selector: ".section.store-locator-container",
        style: null,
        blocks: ["store-locator"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Product Categories",
        selector: ".section.card-tiles.cards-container",
        style: null,
        blocks: ["cards-category"],
        defaultContent: [".card-tiles.cards-container .default-content-wrapper h2"]
      },
      {
        id: "section-5",
        name: "Promotional Cards",
        selector: ".section.home.cards-container",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Rewards Banner",
        selector: ".section.reward-container",
        style: null,
        blocks: ["hero-reward"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-quiz": parse,
    "hero-offer": parse2,
    "store-locator": parse3,
    "cards-category": parse4,
    "cards-promo": parse5,
    "hero-reward": parse6
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
