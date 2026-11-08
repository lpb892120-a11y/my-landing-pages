const fs = require('fs');
const path = require('path');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const urlsInSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log('=== URLs in sitemap.xml (' + urlsInSitemap.length + ') ===');
urlsInSitemap.forEach(u => {
  // convert url to local relative file path
  let rel = u.replace('https://bajiejichang.cfd/', '');
  if (!rel) rel = 'index.html';
  if (!rel.endsWith('.html')) rel += '.html';
  const exists = fs.existsSync(rel);
  console.log((exists ? '✓' : '✗ MISSING'), u, '->', rel);
});

console.log('\n=== Actual HTML files in workspace ===');
function getHtmlFiles(dir) {
  let list = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'scripts') {
        list = list.concat(getHtmlFiles(full));
      }
    } else if (item.name.endsWith('.html')) {
      list.push(full.replace(/\\/g, '/'));
    }
  }
  return list;
}
const allHtml = getHtmlFiles('.');
allHtml.forEach(f => {
  const clean = f.replace(/^\.\//, '').replace(/\.html$/, '');
  const urlWithHtml = 'https://bajiejichang.cfd/' + f.replace(/^\.\//, '');
  const urlClean = 'https://bajiejichang.cfd/' + (clean === 'index' ? '' : clean);
  const inSitemap = urlsInSitemap.includes(urlWithHtml) || urlsInSitemap.includes(urlClean);
  console.log((inSitemap ? '✓ In Sitemap' : '✗ NOT in sitemap:'), f);
});

