import 'babel-polyfill';
import yargs from 'yargs';

import getConfig from './lib/getConfig';
import gremlinsPuppet from './lib/gremlinsPuppet';

const init = async () => {
  const config = getConfig();
  const argv = yargs
    .usage('$0 -url [url]')
    .default('url', config.page.entryPoint)
    .demandOption(['url']).argv;
  gremlinsPuppet(argv.url, config);
};

init();
