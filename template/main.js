//加载electron包
const electron = require('electron');
const app = electron.app;//声明这个是electron全局app对象

app.disableHardwareAcceleration();//关闭硬件访问器
app.commandLine.appendSwitch('disable-http-cache', true);//禁止使用缓存

//加载应用实例此
const App = require("./src/App");
//创建实力
const myApp = new App();
//运行程序
myApp.run();