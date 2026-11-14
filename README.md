# DECORA Invoice Generator V3

Static website: upload index.html, app.js, style.css and assets/ to your existing GitHub Pages repository root. No build or backend. Use Chrome or Edge. Existing V1/V2 storage keys are retained; export a backup before updating.

## Usage
- Enter invoice details and work items. Detailed descriptions accept headings and bullet lines beginning with •, - or *.
- Add advance payments with optional dates. Use the layout handles or arrows to reorder, select payments to group, or split a group. Add charges and page breaks from Invoice layout.
- Summary placement: Automatic flows into available space; Separate page starts the final summary on a fresh sheet when work already spans multiple pages. Manual page breaks can force a new page even for short invoices.
- Long Sample loads invoice 3100 from the reference, with three pages and balance 900693. Load Sample loads invoice 4000.
- Print / Save PDF: choose A4, no browser headers/footers, 100% scale. Download page PNG exports the selected page; All pages ZIP exports individual images; Combined PNG joins pages (maximum eight).
- Saved invoices and backups stay in the browser. Public hosting exposes logo and signature assets; do not commit customer invoice backups to a public repository.

## Verification
Chromium inline browser tests: long sample 3 pages, correct balance, PDF 3 pages, PNG 2480 x 3508, ZIP contains 3 valid PNG entries, short sample 1 page, no-payment sample one Total. Direct file/localhost navigation was blocked by the test environment, so deployed URL and touch interaction remain to be tested. PNG uses SVG foreignObject and canvas; browser support can vary.

Browser tab favicon: assets/favicon.ico and assets/favicon.png (DECORA logo).
