const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let list = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'scripts') {
        list = list.concat(getHtmlFiles(full));
      }
    } else if (item.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const files = getHtmlFiles('.');
const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
const allImgs = new Set();
const missingImgs = [];

for (const file of files) {
  let content = fs.readFileSync(file);
  let str = (content[0] === 0xff && content[1] === 0xfe) ? content.toString('utf16le') : content.toString('utf8');
  let match;
  while ((match = imgRegex.exec(str)) !== null) {
    const src = match[1];
    allImgs.add(src);
    if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      const fileDir = path.dirname(file);
      const imgPath = path.resolve(fileDir, src);
      if (!fs.existsSync(imgPath)) {
        missingImgs.push({ file, src, imgPath });
      }
    }
  }
}

console.log('Total referenced images:', allImgs.size);
console.log('Missing local images count:', missingImgs.length);
missingImgs.forEach(m => console.log('In', m.file, '-> MISSING:', m.src));

