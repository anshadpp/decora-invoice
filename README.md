# DECORA V6.1 – Template Management & Backup Button Consistency

Built on V6.0. Classic DECORA invoice rendering and financial calculations are not modified.

## Changes
- My Templates gallery lists Classic and saved reusable designs with Use, Edit, Duplicate, Rename, Delete.
- Save Template and Save & Apply are distinct; invoice-only Save remains available.
- Deleting a saved design refreshes gallery and selector; if active, user chooses Classic or retaining the invoice snapshot.
- Template storage failures do not show false success; library writes are rolled back on failure.
- Import Backup and Export Backup share matching button dimensions and styles, including mobile layout.
- Service worker cache and asset versions bumped to 6.1.

## Limitations / manual verification
- Gallery preview is a compact template identity card, not a full rendered invoice thumbnail.
- Test template save/delete/rename, refresh, backup round trip, mobile and export workflows in a browser before deployment.
