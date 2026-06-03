import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let fragment = await loadFragment(footerPath);
  if (!fragment) {
    fragment = await loadFragment(`/content${footerPath}`);
  }

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  const sections = [...fragment.querySelectorAll(':scope .section')];
  sections.forEach((section) => footer.append(section));

  block.append(footer);
}
