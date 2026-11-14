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

## Version 2
- Use Invoice layout to drag work items and payment blocks by their handles, or use up/down arrows. Split group separates payments; select payment checkboxes and Group selected combines them at the first selected position. Standard layout moves all payments to the bottom.
- Zero/blank advances are omitted from the invoice; only Total is shown when no payment is positive. Custom layouts show running balances after each payment block and the final balance at the bottom.
- Download PNG exports the invoice at 2480 pixels wide using an embedded SVG/canvas renderer (no external library). Use Chrome or Edge on the hosted HTTPS site; browser support varies. Long invoices export as one tall image.
- Existing v1 browser storage keys are retained; old invoices receive a default layout when opened. Export a backup before updating. Replace index.html, app.js, style.css and README.md in the existing repository; keep assets.
