# DECORA V5.9 — Custom Table Designer

This release builds on V5.8. Classic DECORA is still the default and its renderer is not modified.

## Table customization

1. Open Settings and duplicate Classic to create a custom template.
2. Expand **Visual Designer & Live Preview → Table Designer**.
3. Drag column headers in the canvas or use column grip/arrows to reorder. Edit relative column width in the column list.
4. Drag the table border to position it within the printable content area. Drag the blue bottom-right handle to resize the table width. Numeric X, Y, width, and row padding inputs offer precise control.
5. Drag row grips in the Invoice row order list or use arrow buttons. This changes actual invoice layout order; running balances are recalculated.
6. Switch between Mobile, Desktop and A4 Print previews, then save the custom template.

## Limits and testing

Table geometry is constrained to the page content area; rows remain flow-based so long tables can paginate. Individual cells are not freely positioned. Column widths are relative weights and may need adjustment for long text. Touch interaction and multi-page export appearance should be verified in a browser before production use.

Existing invoices remain Classic unless a custom template is selected. Back up invoices before deploying.
