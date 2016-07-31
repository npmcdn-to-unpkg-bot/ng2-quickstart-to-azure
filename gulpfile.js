"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server"], function () {
    return gulp.src(["src/**/*", "!**/*.ts", "!src/server", "!src/server/**"])
        .pipe(gulp.dest("build"));
});
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json",'systemjs.config.js'], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        '@angular/**/*',
        'angular2-in-memory-web-api/**/*',
        'rxjs/**/*',
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js'        
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});