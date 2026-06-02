export default function decorate(block) {
  // Store locator block - renders a map with store locations
  // The block expects a configuration row with the map embed URL or coordinates
  const link = block.querySelector('a');
  if (link) {
    const mapContainer = document.createElement('div');
    mapContainer.className = 'store-locator-map';
    const iframe = document.createElement('iframe');
    iframe.src = link.href;
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.loading = 'lazy';
    iframe.title = 'Store Locator Map';
    mapContainer.append(iframe);
    block.textContent = '';
    block.append(mapContainer);
  }
}
