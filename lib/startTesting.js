import puppeteer from 'puppeteer';

import config from '../config';

export default async () => {
  const browser = await puppeteer.launch(config.browser);
  const page = await browser.newPage();
  let timeout = null;
  let urls = [];

  browser.on('targetchanged', async ({ _targetInfo }) => {
    const currentUrl = _targetInfo.url.split('?')[0];
    urls.push(_targetInfo.url);
    if (timeout) {
      clearTimeout(timeout);
    }
    await page.waitFor(750);
    await page.addScriptTag({
      url:
        'https://cdnjs.cloudflare.com/ajax/libs/gremlins.js/0.1.0/gremlins.min.js',
    });
    await page.waitFor(750);
    await page.addScriptTag({ path: './lib/gremlinsClient.js' });
    timeout = setTimeout(async () => {
      const target = urls[Math.floor(Math.random() * urls.length)];
      await page.goto(
        target === currentUrl ? `${target}?t=${Date.now()}` : target,
        {
          waitUntil: 'networkidle2',
        }
      );
    }, config.gremlins.timeout);
  });

  await page.setViewport(config.page.viewport);

  await page.goto(config.page.entryPoint, {
    waitUntil: 'networkidle2',
  });
};
