# Merge PDF Tool - File Type Guide

## What Files Can Be Merged?

### ✅ SUPPORTED - Can Merge Directly
- **PDF files** (.pdf)
  - Scanned documents
  - Exported PDFs
  - Native PDFs

### ❌ NOT SUPPORTED - Requires Conversion First

The merge-pdf tool **ONLY accepts PDF files**. If you want to merge other file types, follow these steps:

#### Word Documents (.docx, .doc)
**Problem:** You uploaded a Word document to merge-pdf
**Solution:** 
1. Go to **Word to PDF** tool (https://pdfilio.com/word-to-pdf)
2. Upload your .docx file
3. Convert it to PDF
4. Now use the PDF with the Merge PDF tool

#### Excel Spreadsheets (.xlsx, .xls)
**Solution:**
1. Go to **Excel to PDF** tool (https://pdfilio.com/excel-to-pdf)
2. Upload your spreadsheet
3. Convert it to PDF
4. Merge with Merge PDF tool

#### PowerPoint Presentations (.pptx, .ppt)
**Solution:**
1. Go to **PowerPoint to PDF** tool (https://pdfilio.com/powerpoint-to-pdf)
2. Upload your presentation
3. Convert it to PDF
4. Merge with Merge PDF tool

#### Images (.jpg, .png, .bmp, .gif)
**Solution:**
1. Go to **Image to PDF** tool (https://pdfilio.com/image-to-pdf)
2. Upload your images
3. Convert to PDF
4. Merge with Merge PDF tool

---

## Step-by-Step Example: Merging Word Documents

### Scenario:
You have 2 Word documents you want to combine into one PDF:
- `Report_Part1.docx`
- `Report_Part2.docx`

### Solution:

#### Step 1: Convert First Document
1. Go to https://pdfilio.com/word-to-pdf
2. Click "Upload" and select `Report_Part1.docx`
3. Click "Convert to PDF"
4. Download `Report_Part1.pdf`

#### Step 2: Convert Second Document
1. Go to https://pdfilio.com/word-to-pdf
2. Click "Upload" and select `Report_Part2.docx`
3. Click "Convert to PDF"
4. Download `Report_Part2.pdf`

#### Step 3: Merge the PDFs
1. Go to https://pdfilio.com/merge-pdf
2. Click "Click to select PDF files"
3. Select **BOTH** `Report_Part1.pdf` and `Report_Part2.pdf`
4. Click "Merge PDF Files"
5. Download the merged `merged.pdf`

**Result:** One single PDF containing all pages from both documents!

---

## Error Messages & Solutions

### "Invalid file format: file.docx"
**Meaning:** You tried to merge a Word document
**Solution:** Use the Word to PDF tool first to convert it to PDF

### "Word documents detected: file.docx"
**Meaning:** Word files were selected for merging
**Solution:** The UI will suggest converting them to PDF first using the Word to PDF tool

### "Please select PDF files"
**Meaning:** No valid PDF files were selected
**Solution:** Make sure you're selecting .pdf files, not other formats

### "Please select at least 2 PDF files to merge"
**Meaning:** You selected less than 2 PDFs
**Solution:** Select 2 or more PDF files to merge them together

---

## Why Only PDF Files?

The Merge PDF tool is specifically designed to merge PDFs because:
- PDFs maintain formatting across different systems
- PDFs combine pages sequentially
- PDFs preserve page layouts and fonts
- PDFs are standardized across all platforms

Other file types need to be converted to PDF first to maintain consistency.

---

## Quick Reference: Conversion Paths

```
Word Document (.docx) 
    ↓ Word to PDF
    → PDF
        ↓ Merge PDF
        → Single Combined PDF

Excel File (.xlsx)
    ↓ Excel to PDF
    → PDF
        ↓ Merge PDF
        → Single Combined PDF

PowerPoint (.pptx)
    ↓ PowerPoint to PDF
    → PDF
        ↓ Merge PDF
        → Single Combined PDF

Images (.jpg, .png)
    ↓ Image to PDF
    → PDF
        ↓ Merge PDF
        → Single Combined PDF

Multiple PDFs
    ↓ Merge PDF
    → Single Combined PDF ✅
```

---

## Tips for Best Results

### Before Merging
- ✅ Convert all files to PDF first
- ✅ Check file sizes (max 50MB total)
- ✅ Verify files are readable
- ✅ Organize files in desired order

### During Merging
- ✅ Drag files to reorder if needed
- ✅ Remove unwanted files with X button
- ✅ Check total file size before merging

### After Merging
- ✅ Download immediately
- ✅ Verify all pages are included
- ✅ Check page order is correct

---

## Still Having Issues?

### "Files not converting"
**Check:**
- Is the file actually a .docx? (not .doc or other format)
- Is the file corrupted? (Try opening it first)
- Is the file size reasonable? (not 0 bytes)

### "Merge not working"
**Check:**
- Did you select PDF files or other formats?
- Did you select at least 2 files?
- Is total size under 50MB?

### "Download not starting"
**Solution:**
- Check browser download settings
- Allow pop-ups if needed
- Try a different browser
- Check browser download folder

---

## File Type Support Matrix

| File Type | Tool | Status |
|-----------|------|--------|
| .pdf | Merge PDF | ✅ Direct |
| .docx | Word to PDF → Merge | ✅ Supported |
| .doc | Word to PDF → Merge | ✅ Supported |
| .xlsx | Excel to PDF → Merge | ✅ Supported |
| .pptx | PowerPoint to PDF → Merge | ✅ Supported |
| .jpg | Image to PDF → Merge | ✅ Supported |
| .png | Image to PDF → Merge | ✅ Supported |
| .txt | Not supported | ❌ |
| .zip | Not supported | ❌ |

---

## Summary

**Remember:** Merge PDF tool only accepts **PDF files**.

If you have other file types:
1. Use the corresponding conversion tool (Word → PDF, Excel → PDF, etc.)
2. Then use Merge PDF to combine them

**That's it! Easy workflow** ✨
