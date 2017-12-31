import defaultConfig from '../config.default';
let customConfig;
try {
  customConfig = require('../config').default;
} catch (e) {
  customConfig = {};
}

export default () => ({
  ...defaultConfig,
  ...customConfig,
});
