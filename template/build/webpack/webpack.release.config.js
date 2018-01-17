const config = require('../config.js');//得到配置文件
const path = require('path');//引用path模块
const webpack = require('webpack')//引用webpack模块
//引入通用配置
const webpackBaseConfig = require("./webpack.base.config.js");
//额外创建实例
const webpackReleaseConfig = new webpackBaseConfig();
//配置输出路径
var projectName = "/";//生产环境
//导出模块
module.exports = webpackReleaseConfig;
module.exports.output.publicPath = projectName + config.distStr+'/';
//在原有的基础上扩展模块
module.exports.devtool = '#source-map';
module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
]);
