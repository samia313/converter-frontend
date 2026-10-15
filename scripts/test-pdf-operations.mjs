import assert from 'node:assert/strict';
import { PDFDocument, degrees } from 'pdf-lib';
import JSZip from 'jszip';

const sourcePdf = await PDFDocument.create();
for (let i = 0; i < 4; i += 1) sourcePdf.addPage([612, 792]);
const sourceBytes = await sourcePdf.save();
const source = await PDFDocument.load(sourceBytes);

const first = await PDFDocument.create();
const second = await PDFDocument.create();
for (const page of await first.copyPages(source, [0, 1])) first.addPage(page);
for (const page of await second.copyPages(source, [2, 3])) second.addPage(page);

const zip = new JSZip();
zip.file('sample-part1.pdf', await first.save());
zip.file('sample-part2.pdf', await second.save());
const zipBytes = await zip.generateAsync({ type: 'uint8array' });
const reopened = await JSZip.loadAsync(zipBytes);
const entries = Object.values(reopened.files).filter((entry) => !entry.dir && entry.name.endsWith('.pdf'));
assert.equal(entries.length, 2);
const pageCounts = [];
for (const entry of entries) {
  const bytes = await entry.async('uint8array');
  assert.equal(String.fromCharCode(...bytes.slice(0, 5)), '%PDF-');
  pageCounts.push((await PDFDocument.load(bytes)).getPageCount());
}
assert.deepEqual(pageCounts, [2, 2]);

for (const angle of [90, 180, 270]) {
  const pdf = await PDFDocument.load(sourceBytes);
  pdf.getPages().forEach((page) => page.setRotation(degrees((page.getRotation().angle + angle) % 360)));
  const output = await PDFDocument.load(await pdf.save());
  assert.equal(output.getPageCount(), 4);
  assert.deepEqual(output.getPages().map((page) => page.getRotation().angle), [angle, angle, angle, angle]);
}
assert.throws(() => assert.ok([90, 180, 270].includes(45)));
console.log('PDF operation regression checks passed.');
