#!/usr/bin/env node --harmony

const convert = require('./convert.js');
const restore = require('./restore.js');
const create = require('./create.js');
const vscode = require('./vscode.js');

/**
 * 计划实现：
 * 创建模板:sn create --name name --desc description --codefile file --code 
 * 模板单一生成snippet: sn --file entryfile --out outfile
 * 模板文件夹生成snippet folder: sn --folder entryfolder --out outfolder
 */

 /**
  * sn convert
  * sn restore
  */
const argv = require('yargs')
    .command('convert', 'YAML file convert to code-snippet type file', function(yargs) {
        return yargs
            .option('entry', {
                alias: 'E',
                describe: '[Required] Entry dir where the YAML file location',
                demandOption: true
            })
            .option('out', {
                alias: 'O',
                describe: '[Option] Output dir for the converted code file'
            })
    })
    .command('restore', 'code-snippet file restore to YAML type file', function(yargs) {
        return yargs
            .option('entry', {
                alias: 'E',
                describe: '[Required] Entry dir where the code file location',
                demandOption: true
            })
            .option('out', {
                alias: 'O',
                describe: '[Option] Output dir for the converted YAML file'
            })
    })
    .command('create', 'create template', function(yargs) {
        return yargs
            .options('out', {
                alias: 'O',
                describe: '[Option] Output path'
            })
            .options('name', {
                alias: 'N',
                describe: '[Option] Template name',
            })
    })
    .command('vscode', 'save snippet to vscode', function(yargs) {
        return yargs
            .options('entry', {
                alias: 'E',
                describe: '[Option] Entry Folder or File'
            })
    })
    .help().argv;


const argvCmdAry = argv._;
const cmdAry = [
    'convert',
    'restore',
    'create',
    'vscode',
]

if(argvCmdAry.includes(cmdAry[0])) {
    convert(argv);
} else if (argvCmdAry.includes(cmdAry[1])) {
    restore(argv);
} else if (argvCmdAry.includes(cmdAry[2])) {
    create(argv);
} else if (argvCmdAry.includes(cmdAry[3])) {
    vscode(argv);
}


 
