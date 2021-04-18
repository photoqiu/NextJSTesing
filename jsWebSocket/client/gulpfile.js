/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 16:14:02
 * @LastEditTime: 2021-04-15 13:40:57
 * @LastEditors: ext.qiubo
 * @FilePath: \client\gulpfile.js
 * @version: 
 */
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
var order = require("gulp-order");
const rename = require('gulp-rename');
var concat = require('gulp-concat');

exports.default = function() {
  return src('./src/*.js')
    .pipe(order(['zepto.js', 'base64.js', 'dispatchEvent.js', 'index.js']))
    .pipe(concat('./src/socket.client.js'))
    .pipe(uglify())
    .pipe(rename('socket.client.min.js'))
    .pipe(dest('./output/'));
}