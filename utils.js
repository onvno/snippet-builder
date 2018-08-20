const path = require('path');
const os = require('os');
const process = require('process');

/**
 * 数组添加Commit
 * Add Commit
 * @param {Array} snippet 
 */
const handleCommit = ( snippet, name ) => {
    const snName = name.slice(1);
    
    snippet.unshift(`/* start ${snName} */`);
    snippet.push(`/* end ${snName} */`);

    return snippet;
}

/**
 * 文本转为数组
 * Text Convert to Array
 * @param {String} text 
 */
function buildBodyFromText(text) {
    var fixed = text.replace(/\t/g, '\\t');
    return fixed.split("\n");
}

/**
 * 过滤隐藏文件或文件夹
 * Filter hidden Filr or Folder
 * https://stackoverflow.com/questions/18973655/how-to-ingnore-hidden-files-in-fs-readdir-result
 * @param {Array} list 
 */
const filterMenu = (list) => {
    return list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
}

/**
 * 获取真实路径
 * Get Real Path
 * @param {String} base 
 */
const getRealPath = (base) => {
    return path.isAbsolute(base) ? base : path.join(process.cwd(), base);
}

/**
 * vscode snippet path
 */
const getVsCodeSnippetPath = () => {
    let vsCodeUserSnippetPath;
    const osName = os.type();
    
    switch (osName) {
        case ("Darwin"): {
            vsCodeUserSnippetPath = process.env.HOME + "/Library/Application Support/Code/User/snippets/";
            break;
        }
        case ("Linux"): {
            vsCodeUserSnippetPath = process.env.HOME + "/.config/Code/User/snippets/";
            break;
        }
        case ("Windows_NT"): {
            vsCodeUserSnippetPath = process.env.APPDATA + "\\Code\\User\\snippets\\";
            break;
        }
        default: {
            //BSD?
            vsCodeUserSnippetPath = process.env.HOME + "/.config/Code/User/snippets/";
            break;
        }
    }

    return vsCodeUserSnippetPath;
}



module.exports = {
    handleCommit,
    buildBodyFromText,
    filterMenu,
    getRealPath,
    getVsCodeSnippetPath,
}