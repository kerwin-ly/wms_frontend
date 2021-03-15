const fs = require('fs');
const path = require('path');
const { name } = require('../package.json');

if (!process.argv[2]) {
  console.error('Require Name：node scripts/rename.js my_project_name');
  return;
}
console.warn('rename[start]');

function scanFolder(folderPath, modifyFile){
  //根据文件路径读取文件，返回文件列表
  fs.readdir(folderPath,function(err,files){
      if(err){
          console.warn(err)
      }else{
        files.forEach((filename) => {
          const dir = path.join(folderPath, filename);
          fs.stat(dir, (err,stats) => {
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            if(isFile){
              modifyFile(dir);
            }
            if(isDir){
              if (!dir.endsWith('node_modules') && !dir.endsWith('.git') && !dir.endsWith('assets')) {
                scanFolder(dir, modifyFile);
              }
            }
          })
        });
      }
  });
}

scanFolder(path.resolve(__dirname, '../'), (filePath) => {
  if (!filePath.endsWith('.ico')) {
    const oldStr = fs.readFileSync(filePath).toString();
    const newStr = oldStr.replace(new RegExp(name, 'g'), process.argv[2]);
    if (oldStr !== newStr) {
      console.warn('Rewrite：', filePath);
    }
    fs.writeFileSync(filePath, newStr);
  }
})

console.warn('rename[end]');
