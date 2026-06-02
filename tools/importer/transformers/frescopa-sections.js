/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Frescopa section breaks.
 * Inserts <hr> between sections and Section Metadata blocks when section.style is set.
 * Runs in afterTransform only, using payload.template.sections.
 * Selectors validated against migration-work/cleaned.html:
 *   - .section.teaser-container (line 152)
 *   - .section.offer-container (line 179)
 *   - .section.store-locator-container (line 195)
 *   - .section.card-tiles.cards-container (line 512)
 *   - .section.home.cards-container (line 578)
 *   - .section.reward-container (line 616)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Process sections in reverse order to avoid index shifting
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadata);
      }

      // Insert <hr> before every section except the first one
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
