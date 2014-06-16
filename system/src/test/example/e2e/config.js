/**
 * @summary
 *  Protractor WebDriver Configuration
 */
exports.config = {
  // standalone selenium server address
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // address for browser.get() calls
  baseUrl: 'http://localhost:8000/instance/',

  // capabilities passed to the webdriver instance
  capabilities: {
    'browserName': 'chrome'
  },

  // spec patterns relative to this file
  specs: ['scenario.js'],

  // options to be passed to jasmine-node
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
