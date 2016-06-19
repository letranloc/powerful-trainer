/// <binding BeforeBuild='lib:clean, lib:restore, lib, angularJs, min' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    lib = require('bower-files')({
        overrides: {
            angular: {
                dependencies: {
                    jquery: "latest"
                }
            },
            "highcharts-ng": {
                dependencies: {
                    highcharts: "latest"
                }
            },
            highcharts: {
                main: [
                    "highcharts.js",
                    "highcharts-more.js",
                    "modules/exporting.js",
                    "modules/no-data-to-display.js"
                ]
            }
        }
    }),
    bower = require('gulp-bower'),
    del = require('del'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate');

var paths = {
    webroot: "./wwwroot/"
};

var angularjs = [
    paths.webroot + "js/*.coffee",
    paths.webroot + "js/app/**/*.coffee"
];

paths.cssDest = paths.webroot + "css";
paths.fontDest = paths.webroot + "fonts";
paths.libfont = [
    paths.webroot + "lib/font-awesome/fonts/*.*"
];
paths.template = paths.webroot + "js/app/templates/**/*.html";
paths.templateDest = paths.webroot + "/js/app/templates";
paths.jsDest = paths.webroot + "js";
paths.scss = [
    paths.webroot + "scss/**/commons.scss",
    paths.webroot + "scss/**/*.scss"
];
paths.scssDest = paths.webroot + "css/styles.css";
paths.angularDest = paths.webroot + "js/app.js";
paths.libjsDest = paths.webroot + "js/libs.js";
paths.libcss = [
    paths.webroot + "lib/angular-material/angular-material.css",
    paths.webroot + "lib/font-awesome/css/font-awesome.css",
    paths.webroot + "lib/ng-inline-edit/dist/ng-inline-edit.css",
    paths.webroot + "lib/angular-material-data-table/dist/md-data-table.css",
    paths.webroot + "lib/angular-loading-bar/build/loading-bar.css",
    paths.webroot + "lib/angular-material-sidenav-menu/material-menu-sidenav.css",
    paths.webroot + "lib/mdPickers/dist/mdPickers.css"
];
paths.libcssDest = paths.webroot + "css/libs.css";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.js = [
    paths.libjsDest,
    paths.angularDest
];
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.css = [
    paths.libcssDest,
    paths.scssDest
];
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/styles.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src(paths.js, { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src(paths.css)
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task('lib:restore', function () {
    return bower();
});

gulp.task('lib:clean', function (cb) {
    del([paths.cssDest, paths.fontDest], cb);
});

gulp.task("lib:js", function () {
    gutil.log(lib.ext('js').files);
    return gulp.src(lib.ext('js').files)
        .pipe(concat(paths.libjsDest))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
})

gulp.task("lib:css", function () {
    return gulp.src(paths.libcss)
        .pipe(concat(paths.libcssDest))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
})

gulp.task('lib:fonts', function () {
    return gulp.src(paths.libfont)
        .pipe(gulp.dest(paths.fontDest));
});

gulp.task("lib", ["lib:js", "lib:css", "lib:fonts"]);

gulp.task('angularJs:scss', function () {
    return gulp.src(paths.scss)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat(paths.scssDest))
      .pipe(gulp.dest("."));
});

gulp.task('angularJs:template', function () {
    return gulp.src(paths.template)
      .pipe(templateCache("templates.coffee", {
          templateHeader: 'angular.module "<%= module %>", []<%= standalone %>\r\n.run ($templateCache) ->\r\n',
          templateBody: '\t$templateCache.put "<%= url %>","<%= contents %>"',
          templateFooter: '\r\n'
      }))
      .pipe(gulp.dest(paths.templateDest));
});

gulp.task('angularJs:js', ["angularJs:template"], function () {
    return gulp.src(angularjs)
        .pipe(coffee({ bare: true }).on('error', gutil.log))
        .pipe(ngAnnotate())
        .pipe(concat(paths.angularDest))
        .pipe(gulp.dest('.'));
})

gulp.task("angularJs", ["angularJs:js", "angularJs:scss"]);