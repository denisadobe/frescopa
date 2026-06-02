/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-reward
 * Base block: hero
 * Source: https://frescopa.coffee/
 * Selector: .reward-container .reward.light.left.block
 * Generated: 2026-06-02
 */
export default function parse(element, { document }) {
  // Extract background/hero image
  const bgImage = element.querySelector('img');

  // Extract heading - look for h6, h5, h4, h3, h2, h1 with actual text content
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let heading = null;
  for (const h of headings) {
    if (h.textContent.trim()) {
      heading = h;
      break;
    }
  }

  // Extract description - find paragraphs with actual text content
  const paragraphs = element.querySelectorAll('.reward-left p, p');
  let description = null;
  for (const p of paragraphs) {
    if (p.textContent.trim() && !p.querySelector('a.button')) {
      description = p;
      break;
    }
  }

  // Extract CTA button(s)
  const ctaLinks = Array.from(element.querySelectorAll('a.button, a[href]'));
  // Deduplicate by filtering only unique hrefs
  const seen = new Set();
  const uniqueCtaLinks = ctaLinks.filter((a) => {
    const href = a.getAttribute('href');
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });

  // Build cells matching library example structure:
  // Row 1: Image
  // Row 2: Heading
  // Row 3: Description
  // Row 4: CTA Button(s)
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-reward', cells });
  element.replaceWith(block);
}
