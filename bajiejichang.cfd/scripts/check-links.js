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
const hrefRegex = /href=["']([^"']+)["']/gi;
const brokenLinks = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    let href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      continue;
    }
    // Remove query and hash
    let cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    // Resolve relative to file directory
    const fileDir = path.dirname(file);
    let target = path.resolve(fileDir, cleanHref);
    let targetWithHtml = target.endsWith('.html') ? target : target + '.html';

    if (!fs.existsSync(target) && !fs.existsSync(targetWithHtml)) {
      brokenLinks.push({ file, href, target });
    }
  }
}

console.log('Total broken internal links found:', brokenLinks.length);
brokenLinks.forEach(b => console.log(`In ${b.file} -> broken: ${b.href}`));

