/* eslint-disable */
/* global WebImporter */

/**
 * Parser for store-locator
 * Base block: store-locator (mapped to embed pattern)
 * Source: https://frescopa.coffee/
 * Generated: 2026-06-02
 *
 * Extracts the store locator block content including the sidepanel title
 * and search prompt text. The map is dynamically rendered and will be
 * handled by block decoration JS.
 */
export default function parse(element, { document }) {
  // Extract sidepanel title (h3.sidepanel__title)
  const title = element.querySelector('h3.sidepanel__title, .sidepanel h3, h3');

  // Extract search prompt text (p.search__title)
  const searchTitle = element.querySelector('p.search__title, .search p, .search__title');

  // Build cells matching embed-style structure (single column per row)
  // Each content element gets its own row, matching the Embed pattern
  const cells = [];
  if (title) cells.push([title]);
  if (searchTitle) cells.push([searchTitle]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'store-locator', cells });
  element.replaceWith(block);
}
