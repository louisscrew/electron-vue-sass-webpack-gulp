//引用path模块
const path = require('path');
//各个路径的配置
let distStr = "dist";
let distRootPath = path.resolve(__dirname, "../"+distStr);
let staticSrcPath = path.resolve(__dirname, "../src/static")//静态资源目录
let staticDistPath = path.resolve(__dirname, "../"+distStr+"/static")//静态dist资源目录



exports.distStr = distStr;
exports.distRootPath = distRootPath;
exports.staticSrcPath = staticSrcPath;
exports.staticDistPath = staticDistPath;

let devServerContentBase = path.resolve(__dirname, "../");
//webpack的配置
exports.webpack = {
    outputPath:distRootPath
    ,devServerContentBase:devServerContentBase
    ,serverHost:'0.0.0.0'
    ,serverPort:8080
    ,publicPath:'/'+distStr+'/'//webpack中用到的public
};