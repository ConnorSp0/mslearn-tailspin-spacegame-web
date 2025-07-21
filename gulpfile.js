/// <binding Clean='clean' />
"use strict";

const gulp = require("gulp");
const rimraf = require("rimraf");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass")); // ✅ Use Dart Sass

const paths = {
  webroot: "./Tailspin.SpaceGame.Web/wwwroot/",
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.sassSrc = paths.webroot + "**/*.scss";

// Clean tasks
gulp.task("clean:js", done => rimraf(paths.concatJsDest, done));
gulp.task("clean:css", done => rimraf(paths.concatCssDest, done));
gulp.task("clean", gulp.series("clean:js", "clean:css"));

// Minify JS
gulp.task("min:js", () => {
  return gulp.src([paths.js, "!" + paths.minJs])
    .pipe(concat("site.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.webroot + "js"));
});

// Minify CSS
gulp.task("min:css", () => {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat("site.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.webroot + "css"));
});

// Compile Sass to CSS (optional — if you're using .scss files)
gulp.task("sass", () => {
  return gulp.src(paths.sassSrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.webroot));
});

// Minify all
gulp.task("min", gulp.series("min:js", "min:css"));

// Default
gulp.task("default", gulp.series("sass", "min"));
