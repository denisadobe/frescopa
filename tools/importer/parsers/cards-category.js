/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-category
 * Base block: cards
 * Source: https://frescopa.coffee/
 * Selector: .card-tiles.cards-container .cards.block
 * Generated: 2026-06-02
 *
 * Extracts category cards with image and title from the source DOM.
 * Each card becomes a row with image in one cell and title in another.
 */
export default function parse(element, { document }) {
  // Extract all card list items from the cards block
  const cardItems = element.querySelectorAll(':scope ul > li');

  const cells = [];

  cardItems.forEach((item) => {
    // Extract image from cards-card-image div
    const image = item.querySelector('.cards-card-image picture, .cards-card-image img');

    // Extract title from cards-card-body div
    const title = item.querySelector('.cards-card-body h5, .cards-card-body h4, .cards-card-body h3, .cards-card-body h2, .cards-card-body p');

    // Build a cell array for this card row: [image, title]
    const row = [];
    if (image) row.push(image);
    if (title) row.push(title);

    if (row.length > 0) {
      cells.push(row);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-category', cells });
  element.replaceWith(block);
}
