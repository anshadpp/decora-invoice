# DECORA Invoice Generator V5.8 — Visual Designer Preview

This release extends V5.7 without replacing the Classic DECORA invoice template or its calculation code.

## How to use
1. Open Settings, then choose **Duplicate Classic / Template**.
2. Scroll to **Visual Designer & Live Preview**.
3. Choose **Mobile**, **Desktop**, or **A4 Print**. Mobile supports 320/375/390/430px simulations.
4. In Design mode, drag the outlined logo, business name, invoice title or signature to reposition. Use the property panel for exact X/Y offsets. You can add and edit custom text boxes.
5. Choose Preview mode to hide selection handles, then **Apply design to invoice** or **Save as reusable template**.
6. **Use Classic** restores the original template for the current invoice.

## Important limitations
- This is an opt-in constrained visual editor, not unrestricted Canva. Financial tables and totals retain automatic flow/pagination and cannot be freely dragged. Freeform elements are limited to logo, business name, title, signature and custom text.
- Mobile and Desktop simulate viewing widths of the *same A4 invoice*, not separate document designs.
- The preview uses the existing invoice rendering code. PNG/PDF export is still provided by the original application. Full browser-level visual parity and touch tests have not been completed in this environment.
- Classic DECORA is protected. Historical invoice snapshots and all existing financial calculations remain managed by the original code.
- Before replacing a live deployment, back up saved invoices and test exports and multi-page invoices on your target devices.
