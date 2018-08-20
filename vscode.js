const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const utils = require('./utils.js');
const {filterMenu, getRealPath, getVsCodeSnippetPath} = utils;

const initParams = {
    codePath: path.join(process.cwd(), '.'),
}

module.exports = (argv) => {
    let vsCodeSnippetPath = getVsCodeSnippetPath();
    let codePath = argv.entry ? getRealPath(argv.entry) : initParams.codePath;
    let isDir = fse.lstatSync(path.join(codePath)).isDirectory();

    
    let ignoreFile = [];
    let ignoreDir = [];
    if(isDir) {
        const dirChildren = filterMenu(fse.readdirSync(codePath));
        
        for(var i=0; i<dirChildren.length; i++) {
            const dirChildPath = path.join(codePath, dirChildren[i]);
            const isDirChildPath = fse.lstatSync(dirChildPath).isDirectory();
            const dirChildName = path.basename(dirChildPath);

            if( isDirChildPath ) {
                ignoreDir.push(dirChildName);
            } else if ( path.extname(dirChildName) !== '.json' && path.extname(dirChildName) !== '.code-snippets' ) {
                ignoreFile.push(dirChildName);
            } else {
                fse.copySync(dirChildPath, path.join(vsCodeSnippetPath, dirChildName));
            }
        }

    } else {
        const fileName = path.basename(codePath);
        if(path.extname(fileName) !== '.json' && path.extname(fileName) !== '.code-snippets') {
            ignoreFile.push(fileName);
        } else {
            fse.copyFileSync(codePath, path.join(vsCodeSnippetPath, fileName))
        }
    }

    if(ignoreFile.length > 0){
        console.log(chalk.yellow('Warning: ignore the files for the suffix name not json or code-snippets:', ignoreFile.join(',')))
    }

    if(ignoreDir.length > 0) {
        console.log(chalk.yellow('Warning: ignore the folders for vscode not support nested folder:', ignoreDir.join(',')))
    }
    

}