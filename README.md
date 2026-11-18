# DECORA V6.0 — UI/UX-only update

Built directly on V5.9. All invoice calculation, rendering, designer and data JavaScript files are unchanged. The invoice A4 `.sheet` layout is not restyled.

## Changes
- Consistent buttons, hover/focus/disabled states, spacing and form controls.
- Cleaner editor sections, layout rows, history and export dialog.
- Mobile navigation now shows three primary tabs (Edit / Preview / History), while the same existing Settings and Help actions are accessible in the header.
- Improved small-phone action sizing and designer property controls.
- Screen-only styling; no print or invoice document geometry changes.

## Verification
Run manual regression testing on actual devices before deployment: Edit/Preview/History, settings/help, insert and reorder, all exports, offline refresh, touch drag, and visual comparison of PDF/PNG with V5.9.
