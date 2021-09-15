const config = require('./protractor.conf.js').config;

config.capabilities = {
    browserName: 'chrome',
    chromeOptions: {
        args: ['--headless', '--no-sandbox']
    }
};

exports.config = config;
