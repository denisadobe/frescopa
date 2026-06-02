/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Frescopa site-wide cleanup.
 * Removes non-authorable content (header, footer, empty sections).
 * Selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove overlay div that sits inside header (found at: div.overlay inside header.header-wrapper)
    WebImporter.DOMUtils.remove(element, ['.overlay']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome (header with nav, footer)
    // Found: <header class="header-wrapper"> containing nav#nav, announcements, search, cart, auth
    // Found: <footer class="footer-wrapper"> containing footer links and copyright
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
      'footer.footer-wrapper',
    ]);

    // Remove empty sections at end of <main> that have no content
    // Found: two empty <div class="section"> elements at end of main (lines 638-641)
    const sections = element.querySelectorAll(':scope > .section');
    sections.forEach((section) => {
      if (!section.textContent.trim() && !section.querySelector('img, picture, video, iframe')) {
        section.remove();
      }
    });

    // Remove any stray iframes (found inside store-locator .map area)
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove noscript and link elements if present
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);
  }
}
