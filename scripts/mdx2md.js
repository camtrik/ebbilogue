const fs = require('fs');
const path = require('path');

// 定义基础路径
const basePath = 'data';
const blogPath = 'data/blog';
// 定义源文件夹和目标文件夹
const sourceFolders = ['aigc', 'notes', 'photos'];
const targetFolder = path.join(basePath, 'md_files');

// 创建目标文件夹（如果不存在）
function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
}

// 处理MDX文件，简单复制并重命名
function processMdxFiles() {
  // 创建目标文件夹
  createFolderIfNotExists(targetFolder);
  
  // 遍历源文件夹
  sourceFolders.forEach(sourceFolder => {
    try {
      const fullSourcePath = path.join(blogPath, sourceFolder);
      
      if (!fs.existsSync(fullSourcePath)) {
        console.log(`Source folder does not exist: ${fullSourcePath}`);
        return;
      }
      
      // 读取源文件夹中的所有文件
      const files = fs.readdirSync(fullSourcePath);
      
      // 遍历处理每个文件
      files.forEach(file => {
        const sourceFilePath = path.join(fullSourcePath, file);
        
        // 检查是否是文件
        if (fs.statSync(sourceFilePath).isFile()) {
          // 检查是否是MDX文件
          if (path.extname(file).toLowerCase() === '.mdx') {
            // 读取MDX文件内容
            const content = fs.readFileSync(sourceFilePath, 'utf8');
            
            // 创建带文件夹前缀的MD文件名，避免文件名冲突
            const mdFileName = `${sourceFolder}-${file.replace('.mdx', '.md')}`;
            const targetFilePath = path.join(targetFolder, mdFileName);
            
            // 直接写入内容到MD文件
            fs.writeFileSync(targetFilePath, content);
            console.log(`Renamed: ${sourceFilePath} -> ${targetFilePath}`);
          }
        }
      });
    } catch (error) {
      console.error(`Error processing folder ${sourceFolder}:`, error);
    }
  });
  
  console.log('Conversion completed!');
}

// 执行转换
processMdxFiles();