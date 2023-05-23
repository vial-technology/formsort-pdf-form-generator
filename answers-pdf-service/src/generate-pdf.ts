import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export const generatePDF = async (pageContent: string): Promise<Buffer> => {
  
  const browser = await puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page.setContent(pageContent);

  const pdfBuffer = await page.pdf({ printBackground: true });

  await page.close();
  await browser.close();
  return pdfBuffer;
};
