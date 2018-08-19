const fse = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const chalk = require('chalk');
const log = console.log;

const utils = require('./utils.js');
const {filterMenu, getRealPath} = utils;

const initParams = {
    outPath: path.join(process.cwd(), './modules'),
}

module.exports = (argv) => {
    let entryPath = getRealPath(argv.entry)
    let outPath = argv.out ? getRealPath(argv.out) : initParams.outPath;

    let folders = filterMenu(fse.readdirSync(entryPath));
    

    // 此处需要处理下
    // 最后一行 为`,`的情况
    // body数组最后 为`,`的情况
    const files = filterMenu(fse.readdirSync(entryPath));


    files.map((file) => {
        const suffixIndex = file.lastIndexOf('.');
        
        const fileName = file.slice(0, suffixIndex)
        const fileNameClean = fileName.replace(/\//g, '_'); // 处理文件名中包含路径

        const filePath = path.join(entryPath, file);

        const snCont = fse.readFileSync(filePath, 'utf-8');
        const snJSON = JSON.parse(snCont);
        const snNames = Object.keys(snJSON);
        
        snNames.map(snName => {
            const snCont = [];
            snJSON[snName].body = snJSON[snName].body.join('\n');
            snCont.push(snJSON[snName]);
            const yamlCont = yaml.safeDump(snCont, {
                indent: 4,
            });

            const snNameClean = snName.replace(/\//g, '_'); // 处理文件名中包含路径
            const snPath = path.join(outPath, `${fileNameClean}/${snNameClean}.yaml`)
            fse.ensureFileSync(snPath);
            fse.writeFileSync(snPath, yamlCont, 'utf-8')
        })
    })

    log(chalk.green('Good Job,finish restore code-snippet file to YAML'));
    log(chalk.green(`Outpath: ${outPath}`))
}