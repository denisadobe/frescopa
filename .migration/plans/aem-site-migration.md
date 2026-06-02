# Single Page Migration Plan — AEM Edge Delivery Services

## Overview

Migrate the homepage of **https://frescopa.coffee/** to AEM Edge Delivery Services, including full content, visual design, and navigation (header/footer). This is an e-commerce/product site (coffee brand).

## Source

- **URL:** https://frescopa.coffee/
- **Type:** E-commerce / Product (Coffee brand)
- **Scope:** Single page (homepage), content + design + navigation

## Prerequisites

- [x] Obtain the source page URL from the user
- [ ] Verify the local AEM EDS project is set up and dev server runs at localhost:3000
- [ ] Confirm project structure (blocks/, styles/, scripts/) is in place

## Migration Phases

### Phase 1: Page Analysis
- [ ] Analyze https://frescopa.coffee/ to identify content structure, sections, and block variants
- [ ] Capture screenshots and cleaned HTML for reference
- [ ] Identify navigation structure (header/mega-menu/footer)
- [ ] Document block inventory needed for the page

### Phase 2: Site Design & Tokens
- [ ] Extract design tokens (colors, typography, spacing) from frescopa.coffee
- [ ] Set up global styles (styles.css, fonts.css, lazy-styles.css)
- [ ] Import and configure fonts

### Phase 3: Navigation Migration
- [ ] Migrate header/navigation structure to EDS format
- [ ] Migrate footer structure to EDS format
- [ ] Validate responsive behavior (mobile/tablet/desktop)

### Phase 4: Content & Block Migration
- [ ] Create page template based on analysis
- [ ] Map source content sections to EDS blocks
- [ ] Generate import infrastructure (parsers, transformers)
- [ ] Execute content import to produce HTML
- [ ] Verify content renders correctly in local preview

### Phase 5: Design Application
- [ ] Apply block-level CSS to match source styling
- [ ] Apply section-level layout styles
- [ ] Ensure responsive design matches across breakpoints

### Phase 6: Validation & QA
- [ ] Compare migrated page visually against original
- [ ] Validate accessibility (heading hierarchy, alt text, ARIA)
- [ ] Run linting (`npm run lint`)
- [ ] Check performance against EDS best practices

## Execution Approach

1. **Page Analysis** — Use the page analysis skill to scrape and decompose the homepage
2. **Site Migration** — Use the site migration skill to orchestrate content import, block mapping, and infrastructure generation
3. **Design Migration** — Use the design expert skill to extract and apply visual styling
4. **Navigation** — Use navigation and footer orchestrators to handle header/footer
5. **Validation** — Use page critique skill for visual comparison and QA

## Status

**Ready for execution.** URL confirmed as https://frescopa.coffee/. Switch to Execute mode to begin the migration.
