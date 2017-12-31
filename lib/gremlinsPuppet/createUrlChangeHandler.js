const WAIT_TIME = 750;

const getCurrentUrl = _targetInfo => _targetInfo.url.split('?')[0];

const handleTimeout = (page, urls, timeout) =>
  setTimeout(async () => {
    const target = urls[Math.floor(Math.random() * urls.length)];
    const timestamp = Date.now();
    await page.goto(
      target === currentUrl ? `${target}?t=${timestamp}` : target,
      {
        waitUntil: 'networkidle2',
      }
    );
  }, timeout);

const buildTimeout = time => {
  let instance = null;
  return {
    clear: () => {
      if (instance) {
        clearTimeout(instance);
      }
    },
    set: handleFunction => {
      instance = setTimeout(handleFunction, time);
    },
  };
};

const buildHandleTimeout = (page, urls, currentUrl) => async () => {
  const target = urls[Math.floor(Math.random() * urls.length)];
  const timestamp = Date.now();
  await page.goto(target === currentUrl ? `${target}?t=${timestamp}` : target, {
    waitUntil: 'networkidle2',
  });
};

export default (config, page) => {
  const timeout = buildTimeout(config.gremlins.timeout);
  let urls = [];
  return async ({ _targetInfo }) => {
    const currentUrl = getCurrentUrl(_targetInfo);
    urls.push(_targetInfo.url);
    timeout.clear();
    await page.waitFor(WAIT_TIME);
    await page.addScriptTag({ path: './lib/gremlinsClient.js' });
    const handleTimeout = buildHandleTimeout(page, urls, currentUrl);
    timeout.set(handleTimeout);
  };
};
