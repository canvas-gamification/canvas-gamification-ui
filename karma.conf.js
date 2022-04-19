// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                random: true,
                seed: '4321',
                oneFailurePerSpec: true,
                failFast: true,
                timeoutInterval: 1000
            }
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'text-summary', subdir: 'text', file: 'coverage.txt'}
            ]
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless', 'ChromeHeadlessCI'],
        singleRun: false,
        restartOnFileChange: true,
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        browserNoActivityTimeout: 60000,
        browserDisconnectTimeout: 60000
    });
};
