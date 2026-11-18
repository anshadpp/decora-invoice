# DECORA V5.2 — Smart balance and pagination

Built from DECORA V5.1. Original source and invoice data storage keys are preserved.

- Invoice Layout includes **Show both final advance balance and total balance** (off by default). The final advance balance is suppressed only when it duplicates the Total Balance. Earlier running balances remain visible. The setting is saved with each invoice and exported in JSON backups.
- Automatic pagination retries a compact A4 layout when the last page has only closing/summary content and no work rows. Compact mode reduces whitespace, not page size; it preserves manual page breaks and explicit Separate Page mode. If content cannot fit, multiple pages remain.
- Preview, print, PNG and ZIP share the same rendered pages.
- PWA cache bumped to V5.2.

## Deployment
Back up your invoices, replace all site files and refresh. Validate on your phone before relying on the output for customers.
