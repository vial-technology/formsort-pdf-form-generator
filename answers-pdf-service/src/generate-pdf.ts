import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = ''

export const generatePDF = async (pageContent: string): Promise<Buffer> => {
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })
  const page = await browser.newPage();

  await page.setContent(pageContent);

  const pdfBuffer = await page.pdf({ printBackground: true });

  await page.close();
  await browser.close();
  return pdfBuffer;
};
