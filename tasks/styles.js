const chalk = require('chalk');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const paths = require('./paths.json').styles;

const processors = [
    require('postcss-import')(),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('postcss-calc')(),
    require('autoprefixer')({
        browsers: ['last 2 version'],
        cascade: false
    })
];

function logError(msg) {
    console.log(chalk.bold.red('[ERROR] ' + msg.toString()));
}

function bundle() {
    return gulp.src(paths.entry)
        .pipe(plumber({errorHandler: logError}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(rename(paths.bundle))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest));
}

function lint() {
    return gulp.src(paths.lint)
        .pipe(plumber({
            errorHandler: logError
        }))
        .pipe(postcss([
            require('stylelint')(),
            require('postcss-reporter')({
                clearMessages: true
            })
        ]));
}

function watch() {
    gulp.watch(paths.watch, {
        interval: 500
    }, bundle);
}

module.exports = {
    bundle: bundle,
    lint: lint,
    watch: watch
};
