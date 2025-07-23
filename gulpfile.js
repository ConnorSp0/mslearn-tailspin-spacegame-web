/// <binding Clean='clean' />
"use strict";

const gulp = require("gulp"),
      rimraf = require("rimraf"),
      concat = require("gulp-concat"),
      cleanCSS = require("gulp-clean-css"),
      uglify = require("gulp-uglify"),
      sass = require("gulp-sass")(require("sass")); // Add Sass support

const paths = {
  webroot: "./Tailspin.SpaceGame.Web/wwwroot/",
  scss: "./Tailspin.SpaceGame.Web/scss/**/*.scss",     // SCSS source folder
  cssDest: "./Tailspin.SpaceGame.Web/wwwroot/css"      // Where to output compiled CSS
};

// Existing file paths
paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

// Clean tasks
gulp.task("clean:js", done => rimraf(paths.concatJsDest, done));
gulp.task("clean:css", done => rimraf(paths.concatCssDest, done));
gulp.task("clean", gulp.series(["clean:js", "clean:css"]));

// Compile Sass to CSS
gulp.task("sass", () => {
  return gulp.src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.cssDest));
});

// Minify JS and CSS
gulp.task("min:js", () => {
  return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", () => {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cleanCSS())
    .pipe(gulp.dest("."));
});

// Run Sass first, then minify
gulp.task("min", gulp.series(["min:js", "min:css"]));

// Default task
gulp.task("default", gulp.series(["sass", "min"]));
