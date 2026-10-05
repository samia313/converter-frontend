#!/usr/bin/env python3
import sys
from pdf2docx import Converter

def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: pdf_to_docx.py INPUT_PDF OUTPUT_DOCX")
    src, dst = sys.argv[1], sys.argv[2]
    converter = Converter(src)
    try:
        converter.convert(dst)
    finally:
        converter.close()

if __name__ == "__main__":
    main()
