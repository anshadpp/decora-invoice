# DECORA V5.7 — Optional Invoice Design Studio

Based on DECORA V5.6.1. Classic DECORA remains the default and its original invoice markup/rendering path is unchanged unless a custom template is selected.

## Features
- Settings entry on desktop and mobile; separate settings dialog.
- Protected Classic template; duplicate to customize.
- Business name, multiline address and contact.
- Upload replacement logo and signature (PNG/JPEG/WebP, maximum 1 MB each); restore originals.
- Align, resize and offset branding images in bounded controls.
- Rename, hide/show, reorder six standard table columns; add informational custom columns.
- Enter per-work-item values for custom columns in the Work item editor.
- Custom accent, table font and table text size.
- Save reusable templates in local browser storage; invoice-specific design snapshot stored in the draft and saved invoice data.
- Switch back to Classic without deleting invoice transactions.

## Important limitations
- This is a **settings-based visual designer**, not an unrestricted Canva-style free-drag canvas. Placement uses alignment, size and offset controls.
- Custom columns are informational; they do not affect calculations. The six standard columns are hidden rather than deleted to protect data.
- Uploaded images are stored in local browser data; storage limits apply. Export an invoice backup before clearing browser data. The separate reusable-template library is stored in browser localStorage and is not part of the existing invoice JSON backup.
- Template changes are saved as invoice snapshots, but the currently active invoice's branding can change when you intentionally apply a new template.
- Custom layouts with many columns or large logos may overflow the printable page; verify PDF and PNG exports before production use.
- No automated real-device browser, pagination, PDF/PNG pixel comparison, or accessibility regression suite was run.

## Test
1. Open an existing invoice and confirm Classic appearance.
2. Settings → Duplicate Classic / Template → edit → Save custom design.
3. Add custom column; enter its value under a work item's Custom column values.
4. Preview, print/PDF and PNG export; check table fit.
5. Switch back to Classic and confirm original appearance.
