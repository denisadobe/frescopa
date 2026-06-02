/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-offer
 * Base block: hero
 * Source: https://frescopa.coffee/
 * Selector: .offer-container .offer.block
 * Generated: 2026-06-02
 *
 * Source structure:
 *   div.offer.block > div.offer-content > img (decorative image)
 *   div.offer.block > div.offer-content > div.offer-left > h4.headline + p.detail
 *   div.offer.block > div.offer-content > div.offer-right > a.button.secondary
 *
 * Target structure (from block library):
 *   Row 1: Image
 *   Row 2: Heading
 *   Row 3: Description text
 *   Row 4: CTA link
 */
export default function parse(element, { document }) {
  // Extract image from offer block - try multiple locations
  const image = element.querySelector('.offer-content > img, .offer-content img, img, picture img, picture');

  // Extract heading from offer-left section
  const heading = element.querySelector('.offer-left .headline, .offer-left h4, .offer-left h3, .offer-left h2, .offer-left h1');

  // Extract description paragraph from offer-left section
  const description = element.querySelector('.offer-left .detail, .offer-left p');

  // Extract CTA link(s) from offer-right section
  const ctaLinks = Array.from(element.querySelectorAll('.offer-right a.button, .offer-right a'));

  // Build cells array matching block library structure
  const cells = [];

  // Row 1: Image (optional - only add if present)
  if (image) {
    cells.push([image]);
  }

  // Row 2: Heading
  if (heading) {
    cells.push([heading]);
  }

  // Row 3: Description
  if (description) {
    cells.push([description]);
  }

  // Row 4: CTA button(s)
  if (ctaLinks.length > 0) {
    cells.push([...ctaLinks]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-offer', cells });
  element.replaceWith(block);
}
