"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var environments = require("gulp-environments");
var sourcemaps = require("gulp-sourcemaps");
var bower = require("gulp-bower");

var config = {
  sassPath: "./sass",
  bowerDir: "."
}

var development = environments.development;
var production = environments.production;

gulp.task("bower", function () {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task("icons", function () {
  return gulp.src(config.bowerDir + "/font-awesome/fonts/**.*")
    .pipe(gulp.dest("./fonts"));
});

gulp.task("scss", function () {
  return gulp.src([
    config.sassPath + "/style.scss"
  ])
    .pipe(development(sourcemaps.init()))
    .pipe(development(sass({
      includePaths: [
        "./resources/sass",
        config.bowerDir + "/bootstrap/assets/stylesheets",
        config.bowerDir + "/font-awesome/scss"]
    })
      .on("error", sass.logError)))
    .pipe(production(sass({
      outputStyle: "compressed",
      includePaths: [
        "./resources/sass",
        config.bowerDir + "/bootstrap/assets/stylesheets",
        config.bowerDir + "/font-awesome/scss"]
    }))
      .on("error", sass.logError))
    .pipe(development(sourcemaps.write("./maps")))
    .pipe(gulp.dest("./css"));
});

// Rerun the task when a file changes
gulp.task("watch", function () {
  gulp.watch(config.sassPath + "/**/*.scss", ["scss"]);
});

gulp.task("default", ["bower", "icons", "scss"]);
