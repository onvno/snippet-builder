const fse = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const chalk = require('chalk');
const log = console.log;

const utils = require('./utils.js');
const {handleCommit, buildBodyFromText, filterMenu, getRealPath} = utils;

const initParams = {
    outPath: path.join(process.cwd(), './snippets'),
    singleName: '@codeRhythm',
}

module.exports = (argv) => {
    let entryPath = getRealPath(argv.entry)
    let outPath = argv.out ? getRealPath(argv.out) : initParams.outPath;

    let folders = filterMenu(fse.readdirSync(entryPath));
    let repeatSn = [];

    /**
     * 为保证输出避免重名覆盖，文件和文件夹不能混合在同一个目录
     */
    const handleMixin = (basePath, itemAry) => {
        let mix = false;
        let isDir = fse.lstatSync(path.join(basePath, itemAry[0])).isDirectory();
        for(var i=1; i<itemAry.length; i++) {
            if(fse.lstatSync(path.join(basePath, itemAry[i])).isDirectory() !== isDir) {
                log(chalk.red('Error: Files & Folders cant apper at the same entry folder'))
                mix = true;
                break;
            }
        }
        return mix;
    }
    if(handleMixin(entryPath, folders)) { return };

    /**
     * TODO:
     * 文件:统一合并
     * 文件夹：自动进入下一层合并问价
     */
    const folderConvert = (folders) => {
        // 当前路径下均为folder，每个文件夹生成一个

        if(fse.lstatSync(path.join(entryPath, folders[0])).isDirectory()){
            folders.map( folder => {
                const folderPath = path.join(entryPath, folder);
                const files = filterMenu(fse.readdirSync(folderPath))
                let sn = {};
                fileConvert(files, folder, folderPath);
            })
        }
        // 当前路径下均为file,最终合并为一个
        else {
            fileConvert(folders,)
        }
    }

    const fileConvert = (files, folder) => {
        folder = folder ? folder : '';
        let folderBuild = folder ? folder : initParams.singleName;
        let sn = {};        
        
        files.map( file => {
            const filePath = path.join(entryPath, folder, file)
            const parts = yaml.safeLoad(fse.readFileSync(filePath, 'utf8'));
    
            parts.map( part => {
                const bodyCode = buildBodyFromText(part.body);
                const bodyCont = handleCommit(bodyCode, part.prefix);
        
                if(sn[part.prefix]){
                    repeatSn.push(part.prefix);
                }
                sn[part.prefix] = {
                    prefix: part.prefix,
                    body: bodyCont,
                    description: part.description
                }
            } )
        })
    
        const newText = JSON.stringify(sn, null, '\t');
    
        const snPath = path.join(outPath, `./${folderBuild}.code-snippets`);
        fse.ensureFileSync(snPath);
        fse.writeFileSync(snPath, newText, 'utf-8')
    }

    folderConvert(folders);

    
    if(repeatSn.length) {
        log(chalk.yellow("Warning: Finish Snippets Convert!"))
        log(chalk.yellow("Warning: Repeat snippet name automatic overlay:"))
        log(chalk.yellow("Warning:", repeatSn.join()))
    }
}
