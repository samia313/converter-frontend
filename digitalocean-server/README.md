# PDFilio Conversion Server

## Required system packages

The conversion routes invoke system binaries, not shell strings. Install these on the DigitalOcean droplet:

```bash
sudo apt update
sudo apt install -y libreoffice poppler-utils ocrmypdf tesseract-ocr
```

For additional OCR languages, install the matching Tesseract language packs (for example `tesseract-ocr-urd` for Urdu).

## Configuration

Copy `.env.example` to `.env` and set real secrets. Do not commit `.env`.

`ALLOWED_ORIGINS` must contain the exact frontend origins that are permitted to call this server.

## Run checks

```bash
npm install
npm run check
npm start
```

Conversion outputs are stored privately in DigitalOcean Spaces and returned as short-lived signed URLs. Do not change the bucket objects back to `public-read`.
