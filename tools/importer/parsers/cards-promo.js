/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo
 * Base block: cards
 * Source: https://frescopa.coffee/
 * Selector: .home.cards-container .cards.block
 * Generated: 2026-06-02
 *
 * Source structure: ul > li items, each with .cards-card-image (picture/img)
 * and .cards-card-body (heading, description paragraph, CTA link).
 * Target: Cards block table with one row per card containing image, title,
 * description, and link.
 */
export default function parse(element, { document }) {
  // Extract all card items from the list
  const cardItems = element.querySelectorAll(':scope ul > li');

  const cells = [];

  cardItems.forEach((card) => {
    // Extract image from the card image container
    const image = card.querySelector('.cards-card-image picture, .cards-card-image img');

    // Extract heading (h3 or h4 used in source)
    const heading = card.querySelector('.cards-card-body h1, .cards-card-body h2, .cards-card-body h3, .cards-card-body h4, .cards-card-body h5, .cards-card-body h6');

    // Extract description paragraph (not the button-container)
    const description = card.querySelector('.cards-card-body p:not(.button-container)');

    // Extract CTA link
    const ctaLink = card.querySelector('.cards-card-body .button-container a, .cards-card-body a.button');

    // Build cell content for this card - each card is a row with two cells:
    // cell 1: image, cell 2: text content (heading, description, CTA)
    const imageCell = [];
    if (image) imageCell.push(image);

    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (ctaLink) contentCell.push(ctaLink);

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
