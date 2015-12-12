const args = require('yargs').argv;
const browserSync = require('browser-sync').create();
const paths = require('./paths.json').connect;

module.exports = function() {
    browserSync.init({
        server: {
            baseDir: (args.min ? paths.dirMin : paths.dir)
        },
        files: paths.files,
        // open: false,
        // port: '8000',
        reloadDebounce: 500
    });
};
