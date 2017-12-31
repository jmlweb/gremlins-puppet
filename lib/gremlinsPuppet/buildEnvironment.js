import puppeteer from 'puppeteer';

export default async (browserConfig) => {
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();
  return {
    browser,
    page,
  }
}
