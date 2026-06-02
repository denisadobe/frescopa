/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-quiz
 * Base block: hero
 * Source: https://frescopa.coffee/
 * Selector: .teaser-container .teaser.dark.right
 * Generated: 2026-06-02
 *
 * Extracts background image, eyebrow, heading, description, and CTA
 * from a teaser/hero block and produces a Hero block table.
 */
export default function parse(element, { document }) {
  // Extract background image from .background picture
  const bgImage = element.querySelector('.background img, .background picture img');

  // Extract eyebrow text
  const eyebrow = element.querySelector('.foreground .text .eyebrow, .text .eyebrow');

  // Extract heading (h3 in source, but handle h1-h6 for variations)
  const heading = element.querySelector('.foreground .text .title h1, .foreground .text .title h2, .foreground .text .title h3, .foreground .text .title h4, .text .title h1, .text .title h2, .text .title h3');

  // Extract description text (may be empty)
  const descriptionEl = element.querySelector('.foreground .text .long-description, .text .long-description');
  const descriptionText = descriptionEl && descriptionEl.textContent.trim();

  // Extract CTA links
  const ctaLinks = Array.from(element.querySelectorAll('.foreground .text .cta a, .text .cta a'));

  // Build cells array matching hero block library structure:
  // Each row is a single-cell row per the library example:
  // Row 1: background image
  // Row 2: eyebrow + heading + description + CTAs (all in one cell, stacked vertically)
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([[bgImage]]);
  }

  // Row 2: Single cell with all text content stacked vertically
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-quiz', cells });
  element.replaceWith(block);
}
