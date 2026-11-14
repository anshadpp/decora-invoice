# DECORA Invoice Generator V5.1

Static GitHub Pages website. Upload all files in this directory to the existing repository root, including assets, manifest.webmanifest, mobile.js and sw.js. Keep Pages configured to main / (root). No build step or external dependencies.

## Mobile
Edit, Preview and History tabs at widths up to 900px. Expand work cards to edit; use layout handles or arrows to reorder. Preview defaults to Fit screen; use Previous/Next or swipe at fit zoom. Export from the bottom bar. Native PNG sharing is attempted when supported, otherwise downloads. Combined PNG is limited to three pages on mobile and eight on desktop; ZIP is the alternative. Print uses the browser print dialog.

## Install / offline
After visiting the deployed HTTPS site online, allow the service worker to finish caching. Android Chrome: browser menu > Install app / Add to Home screen. iPhone Safari: Share > Add to Home Screen. Installation and offline availability depend on browser support and storage retention. Local file opening does not enable service workers. Saved invoices remain in localStorage under the V1 keys, not synced between devices. Export a backup before upgrading or clearing site data.

## Existing functionality
A4 pagination, split descriptions, payment groups, dates, additional charges, page breaks, summary placement, PDF printing, PNG and ZIP export, favicon and original branding retained. The public site includes the signature asset; do not publish it if it must remain private.

## Verification
JavaScript syntax checked; inline Chromium mobile viewport test verified three-page sample, fit width, next page and PNG canvas dimensions. HTTP navigation blocked by test environment; deployed service worker/offline, native share, installation and physical-device touch tests remain to be verified. Full-screen and file sharing depend on browser capabilities. Mobile export uses the same fixed A4 geometry as desktop.

## V5 work catalogue
315 English work names in 21 categories. Type any name (including Malayalam) or browse/search; no catalogue match required. Optional details are collapsed. Apply area explicitly to the existing quantity; saved rates are applied explicitly, never automatically. Copy specifications into the existing description to print them. Custom works are stored separately in this browser (invoice backup does not include the custom catalogue). Existing invoice storage keys and PDF renderer remain unchanged. Built-in Malayalam translations are not included in this release.

V5 checks: Chromium mobile viewport tested autocomplete, manual names, area calculation, custom catalogue saving, browsing and long sample pagination. Live service worker, physical devices and export regression testing remain outstanding.

## V5.1 UI update
Inline catalogue button, suggestions close on selection, recent works, mobile catalogue sheet and grouped invoice layout controls. Invoice calculation and rendering code unchanged. Browser storage keys unchanged. Deploy all files together. Physical-device and live offline checks remain necessary.
