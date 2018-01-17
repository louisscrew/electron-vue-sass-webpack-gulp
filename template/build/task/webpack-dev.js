const config = require('../config.js');//得到配置文件
const path = require('path');//引用path模块
const gulp = require('gulp'); //加载gulp模块


//开发环境执行的热部署
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const webpackDevConfig = require("../webpack/webpack.dev.config.js");

//启动开发webpack服务器
gulp.task("webpack-dev", function(callback) {
    var hostStr = "http://"+config.webpack.serverHost+":"+config.webpack.serverPort+"/";
    //为了启动热部署额外添加的配置
    webpackDevConfig.entry.build.unshift("webpack-dev-server/client?"+hostStr);
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackDevConfig), {
        contentBase: config.webpack.devServerContentBase
        ,publicPath: webpackDevConfig.output.publicPath
        ,stats: {
            colors: true
        }
    }).listen(config.webpack.serverPort, config.webpack.serverHost, function(err) {
        if (err) console.log(err);
        console.log('Listening at '+hostStr);
    });
});
