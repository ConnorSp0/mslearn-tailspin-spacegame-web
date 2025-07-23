/// <binding Clean='clean' />
"use strict";

const gulp = require("gulp"),
      rimraf = require("rimraf"),
      concat = require("gulp-concat"),
      cleanCSS = require("gulp-clean-css"),
      uglify = require("gulp-uglify"),
      sass = require("gulp-sass")(require("sass"));  // ✅ USE `sass` here

const paths = {
  webroot: "./Tailspin.SpaceGame.Web/wwwroot/",
  scss: "./Tailspin.SpaceGame.Web/scss/**/*.scss",     // ✅ Add this line
  cssDest: "./Tailspin.SpaceGame.Web/wwwroot/css"      // ✅ CSS output
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

// ✅ Compile SCSS
gulp.task("sass", function () {
  return gulp.src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.cssDest));
});

gulp.task("clean:js", done => rimraf(paths.concatJsDest, done));
gulp.task("clean:css", done => rimraf(paths.concatCssDest, done));
gulp.task("clean", gulp.series(["clean:js", "clean:css"]));

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

gulp.task("min", gulp.series(["sass", "min:js", "min:css"])); // ✅ Add "sass" here
gulp.task("default", gulp.series(["min"]));
