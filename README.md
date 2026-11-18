# DECORA V5.5.1 – Mobile Insert selection fix

The inline Insert control now retains the selected row type across mobile picker interactions, and the button displays the selected type (for example, “+ Insert Discount”). This prevents accidental Balance / subtotal insertion when Discount is selected. Existing invoice appearance and financial calculations are unchanged.

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


## V5.5: flexible invoice adjustments and mobile navigation
- Mobile Edit, Preview, History tabs preserve their independent scroll positions.
- Insert travel, transport, delivery, installation, labour, site visit, service or custom charges.
- Insert fixed or percentage discounts with work/charge or outstanding-balance basis.
- Insert automatic nearest/up/down rupee round-off or manual signed round-off.
- Insert signed positive/negative adjustments.
- Adjustments follow the row order and update running and final balance calculations.
- All rows persist in the existing invoice state and JSON backup. Printable A4 template is unchanged.

## V5.5.2 correction
- Fixed Discount and Round-off editor rendering: shared dropdown helper is now available to every row type. Previously these rows triggered a ReferenceError after insertion.
- Discount and Round-off editor headings now respect their custom labels.
- Existing invoice preview styling and calculation rules are unchanged.
