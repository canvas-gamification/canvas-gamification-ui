const config = require('./protractor.conf').config;

config.capabilities = {
    browserName: 'ChromeHeadless',
    chromeOptions: {
        args: ['--headless', '--no-sandbox', '--disable-gpu']
    }
};

exports.config = config;
