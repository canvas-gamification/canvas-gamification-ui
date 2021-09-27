const config = require('./protractor.conf').config;

config.capabilities = {
    browserName: 'ChromeHeadlessCI',
    chromeOptions: {
        args: ['--headless', '--no-sandbox']
    }
};

exports.config = config;
