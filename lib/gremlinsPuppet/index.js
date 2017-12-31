import buildEnvironment from './buildEnvironment';
import createUrlChangeHandler from './createUrlChangeHandler';

const gremlinsPuppet = async (url, config) => {
  const { browser, page } = await buildEnvironment(config.browser);
  const handleUrlChange = createUrlChangeHandler(config, page);
  browser.on('targetchanged', handleUrlChange);
  await page.setViewport(config.page.viewport);
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
};

export default gremlinsPuppet;
