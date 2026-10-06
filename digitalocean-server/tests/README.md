# PDFilio conversion engine tests

## PDF → Word

The test harness deliberately uses a real PDF fixture rather than asserting only that a command returned exit code 0.

Run:

```bash
PDF_TO_WORD_FIXTURE=/absolute/path/sample.pdf npm run test:pdf-to-word
```

The test verifies that:

1. LibreOffice actually creates the requested DOCX.
2. The output is non-empty.
3. The result is a valid DOCX/ZIP container.

For production accuracy, keep a golden fixture set containing:
- text-only PDF
- multi-column PDF
- tables
- mixed text + images
- headers/footers
- scanned PDF
- RTL/Unicode text

For each fixture, compare extracted text, page/paragraph ordering, tables, image count and visual rendering. A binary DOCX hash is intentionally **not** used because LibreOffice metadata makes byte-for-byte equality unsuitable.
