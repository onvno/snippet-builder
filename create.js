const fse = require('fs-extra');
const path = require('path');

const originTempPath = path.join(__dirname, 'template', 'base.yaml');

const utils = require('./utils.js');
const {getRealPath} = utils;

const initParams = {
    tempName: 'codeRhythm',
    tempPath: path.join(process.cwd(), '.'),
}

module.exports = (argv) => {
    let tempName = argv.name ? argv.name : initParams.tempName;
    let tempPath = argv.out ? getRealPath(argv.out) : initParams.tempPath;

    let tempConcatPath = path.join(tempPath, `${tempName}.yaml`);

    fse.copyFileSync(originTempPath, tempConcatPath)
}