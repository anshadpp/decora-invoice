# DECORA Invoice Generator

Static website: no build, server, account or external dependencies.

## Deploy to GitHub Pages
1. Create a repository named `decora-invoice`.
2. Upload the contents of this folder (index.html, style.css, app.js, assets and README) to the repository root.
3. In Settings > Pages, select Deploy from a branch, main, / (root), Save.
4. Open the published URL shown by GitHub Pages.

## Use
Open index.html in a browser or use the deployed site. Load sample to reproduce the reference. Edit details, add items and advances, then Save invoice. Print / Save PDF opens the browser print dialog; choose Save as PDF, A4, and disable browser headers and footers. Long invoices may span multiple pages. Export backup periodically; import replaces existing local records after confirmation.

Amounts are INR. Blank quantity means 1; GST is added to the line rate and rounded to paise. Advances reduce the total. Data stays in local browser storage, not a shared database. Clearing site data removes records. The supplied logo and signature are public assets when deployed; use a private hosting arrangement or remove the signature if it must not be public. The template reproduces the supplied design and is not a GST compliance system.
