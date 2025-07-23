/// <binding Clean='clean' />
"use strict";

// Import required modules
const { src, dest, series, parallel } = require("gulp");
const rimraf = require("rimraf");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const path = require("path");

const paths = {
    webroot: "./Tailspin.SpaceGame.Web/wwwroot/",
};

paths.js = path.join(paths.webroot, "js/**/*.js");
paths.minJs = path.join(paths.webroot, "js/**/*.min.js");
paths.css = path.join(paths.webroot, "css/**/*.css");
paths.minCss = path.join(paths.webroot, "css/**/*.min.css");
paths.concatJsDest = path.join(paths.webroot, "js/site.min.js");
paths.concatCssDest = path.join(paths.webroot, "css/site.min.css");

// Clean tasks
function cleanJs(done) {
    rimraf(paths.concatJsDest, done);
}

function cleanCss(done) {
    rimraf(paths.concatCssDest, done);
}

const clean = parallel(cleanJs, cleanCss);

// Minify JS
function minJs() {
    return src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(dest("."));
}

// Minify CSS
function minCss() {
    return src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cleanCSS())
        .pipe(dest("."));
}

// Grouped tasks
const min = series(minJs, minCss);

// Default task
exports.clean = clean;
exports.min = min;
exports.default = min;
