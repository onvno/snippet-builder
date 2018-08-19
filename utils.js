const path = require('path');

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

module.exports = {
    handleCommit,
    buildBodyFromText,
    filterMenu,
    getRealPath,
}