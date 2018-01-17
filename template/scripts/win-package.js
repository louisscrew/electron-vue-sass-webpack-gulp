console.log("windows packages is mading");

const packageConfig = require('../package');
const path = require('path');
const rootPath = path.join(__dirname, '..');
// const tempAppFoloder = path.join(rootPath, 'tmpapp');
const outFoloder = path.join(rootPath, 'out');
const fs = require('fs-extra');//文件扩展方法
const packager = require('electron-packager');
const assetsDir = path.join(rootPath, 'assets');
const iconPath = path.join(assetsDir, 'app-icon','win','app.ico');
const appName = packageConfig.name;
const companyName = packageConfig.CompanyName;

function startPackage(){
    return new Promise((resolve, reject) => {
        packager({
            dir:rootPath,
            asar:false,
            overwrite:true,
            platform:'win32',
            arch:'ia32',
            out:outFoloder,
            icon:iconPath,
            win32metadata:{
                ProductName:appName,
                CompanyName:companyName
            }
        }, function (err, appPaths) {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });
    });
}


startPackage()
    // .then(startPackage)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1);
    });