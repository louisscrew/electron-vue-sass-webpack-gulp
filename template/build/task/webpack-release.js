const config = require('../config.js');//得到配置文件
const path = require('path');//引用path模块
const gulp = require('gulp'); //加载gulp模块
const webpack = require("webpack");//引入webpack模块
const webpackReleaseConfig = require("../webpack/webpack.release.config.js");
//添加webpack的发布任务
gulp.task('webpack-release',function () {

    webpack(webpackReleaseConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
    });
});
