import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const htmlPath = path.resolve(
  'press/build/print/bookone/index.html'
);

const pdfPath = path.resolve(
  'press/pdf/bookone.pdf'
);

fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`file://${htmlPath}`, {
  waitUntil: 'networkidle',
});

await page.pdf({
  path: pdfPath,
  format: 'A4',
  outline: true,
  printBackground: true,
  // displayHeaderFooter: false,
});

await browser.close();

console.log('PDF generated:', pdfPath);
