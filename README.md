# DECORA V5.4 – Free-form Invoice Row Builder

## Plan implemented
1. Insert a work item, advance payment, balance/subtotal, charge, divider or page break **after any existing row** using the inline Insert controls in **Edit → Invoice layout**.
2. Move rows with existing arrows or drag handles. Balances in **Running balance above** mode are calculated using only preceding work, charges and advances.
3. Rename or remove summary rows, choose calculated or manual amounts, and insert multiple balance checkpoints. Manual displayed amounts do not alter underlying transactions.
4. Load **Reference layout** under Saved invoices to reproduce the user's example: ₹140,433 work, ₹50,000 + ₹50,000 advances, ₹40,433 balance, ₹11,750 further work, ₹52,183 total balance, ₹15,000 third advance and ₹37,183 final balance.
5. Existing invoice data, catalogue, export paths, page breaks and invoice visual styles are retained.

## How to use
In **Invoice layout**, use the small **row type / + Insert** controls immediately below any row. Work and advance details can be edited in their existing sections. Summary rows are configured directly in the layout editor. Use **Reference layout** to test the intended sequence; this replaces only the current draft after confirmation, not saved history.

## Notes
The order-aware calculated balance is separate from any manual displayed override. The final accounting balance is not changed by editing a summary label or amount. Existing V5.3 summary settings remain supported. Back up invoices before deploying; verify PDF, PNG, ZIP and mobile PWA in a real browser.
