"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var svgmin = require('gulp-svgmin');
var svgstore = require("gulp-svgstore");
var del = require("del");
var run = require("run-sequence");


gulp.task("clean", function() {
  del("build");
});

gulp.task("fonts", function() {
  gulp.src("fonts/**/*")
    .pipe(plumber())
    .pipe(gulp.dest("build/fonts"));
});


gulp.task("scripts", function() {
  gulp.src("js/**/*")
    .pipe(plumber())
    .pipe(gulp.dest("build/js"));
});

gulp.task("vendors", function() {
  gulp.src("vendors/**/*")
    .pipe(plumber())
    .pipe(gulp.dest("build/vendors"));
});


gulp.task("pages", function() {
  gulp.src("*.html")
    .pipe(plumber())
    .pipe(gulp.dest("build"))
    .pipe(server.reload({stream: true}));
});

gulp.task("images", function() {
  gulp.src("img/*.{png,jpg,gif}")
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));

  gulp.src("img/*.svg") // not a sprite
    .pipe(plumber())
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  gulp.src("img/symbols/*.svg")
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("style", function() {
  gulp.src("postcss/style.css")
    .pipe(plumber())
    .pipe(postcss([
      precss(),
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(minify())
    .pipe(gulp.dest("build/css"))

    .pipe(server.reload({stream: true}));
});

gulp.task("build", function (fn) {
  run("clean", "style", "images", "symbols", "pages", "fonts", "scripts", "vendors", fn);
});

gulp.task("serve", ["build"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("postcss/**/*.css", ["style"]);
  gulp.watch("*.html", ["pages"]);
});
