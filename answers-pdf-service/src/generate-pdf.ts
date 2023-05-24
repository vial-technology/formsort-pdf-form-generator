import puppeteer from 'puppeteer';

export const generatePDF = async (pageContent: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.setContent(pageContent);

  const pdfBuffer = await page.pdf({ printBackground: true });

  await page.close();
  await browser.close();
  return pdfBuffer;
};
