const config = require('../config.js');//得到配置文件
const path = require('path');//引用path模块
const webpack = require('webpack')//引用webpack模块

//引入通用的配置文件
const webpackBaseConfig = require("./webpack.base.config.js");
//额外创建dev的独立实例
const webpackDevConfig = new webpackBaseConfig();
module.exports = webpackDevConfig;
module.exports.output.publicPath = "/" + config.distStr+'/';
module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
]);
