const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts) {
  let res = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'scripts') {
        res = res.concat(getAllFiles(full, exts));
      }
    } else if (exts.some(ext => item.name.endsWith(ext))) {
      res.push(full);
    }
  }
  return res;
}

const htmlFiles = getAllFiles('.', ['.html']);
console.log('HTML files count:', htmlFiles.length);

for (const file of htmlFiles) {
  let content = fs.readFileSync(file);
  let isUtf16 = (content[0] === 0xff && content[1] === 0xfe);
  let str = isUtf16 ? content.toString('utf16le') : content.toString('utf8');
  
  const m = str.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const canonical = m ? m[1] : 'NONE';

  const t = str.match(/<title>([^<]*)<\/title>/i);
  const title = t ? t[1] : 'NO TITLE';

  console.log(file, '| enc:', isUtf16 ? 'utf16' : 'utf8', '| canonical:', canonical);
}

