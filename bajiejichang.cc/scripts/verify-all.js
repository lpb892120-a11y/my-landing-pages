const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Read sitemap.xml
const sitemapContent = fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8');
const sitemapLocs = [];
const locRegex = /<loc>(https:\/\/bajiejichang\.cc\/[^<]*)<\/loc>/g;
let m;
while ((m = locRegex.exec(sitemapContent)) !== null) {
  sitemapLocs.push(m[1]);
}

console.log(`=== Sitemap Verification ===`);
console.log(`Total URLs in sitemap.xml: ${sitemapLocs.length}`);

// Check if any sitemap URL contains .html
const htmlInSitemap = sitemapLocs.filter(u => u.endsWith('.html'));
if (htmlInSitemap.length > 0) {
  console.error(`ERROR: Found URLs with .html in sitemap.xml:`, htmlInSitemap);
} else {
  console.log(`PASS: 0 URLs in sitemap.xml contain .html extension (All are Clean URLs).`);
}

// 2. Read all HTML files
function getAllHtmlFiles(dir, list = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'scripts') {
        getAllHtmlFiles(full, list);
      }
    } else if (item.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`\n=== HTML Files Verification (${htmlFiles.length} files) ===`);

let canonicalErrors = 0;
let geoErrors = 0;
let ogErrors = 0;
let twitterErrors = 0;
let hreflangErrors = 0;

const pageCanonicals = [];

for (const f of htmlFiles) {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  const content = fs.readFileSync(f, 'utf8');

  // 1. Canonical check
  const canonMatch = content.match(/<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']+)["']/i) ||
                     content.match(/<link\s+[^>]*?href=["']([^"']+)["'][^>]*?rel=["']canonical["']/i);
  if (!canonMatch) {
    console.error(`FAIL [Canonical Missing]: ${rel}`);
    canonicalErrors++;
  } else {
    const canon = canonMatch[1];
    if (canon.endsWith('.html')) {
      console.error(`FAIL [Canonical has .html]: ${rel} -> ${canon}`);
      canonicalErrors++;
    }
    if (!sitemapLocs.includes(canon)) {
      console.error(`FAIL [Canonical not in Sitemap]: ${rel} -> ${canon}`);
      canonicalErrors++;
    }
    pageCanonicals.push(canon);
  }

  // 2. GEO check
  if (!content.includes('name="geo.region"') || !content.includes('name="geo.placename"') || !content.includes('name="geo.position"') || !content.includes('name="ICBM"')) {
    console.error(`FAIL [GEO Tags Incomplete]: ${rel}`);
    geoErrors++;
  }

  // 3. Open Graph check
  if (!content.includes('property="og:title"') || !content.includes('property="og:url"') || !content.includes('property="og:site_name"')) {
    console.error(`FAIL [Open Graph Incomplete]: ${rel}`);
    ogErrors++;
  }

  // 4. Twitter check
  if (!content.includes('name="twitter:card"') || !content.includes('name="twitter:title"')) {
    console.error(`FAIL [Twitter Tags Incomplete]: ${rel}`);
    twitterErrors++;
  }

  // 5. Hreflang check
  if (!content.includes('hreflang="zh-CN"') || !content.includes('hreflang="x-default"')) {
    console.error(`FAIL [Hreflang Incomplete]: ${rel}`);
    hreflangErrors++;
  }
}

console.log(`Canonical errors: ${canonicalErrors}`);
console.log(`GEO errors: ${geoErrors}`);
console.log(`Open Graph errors: ${ogErrors}`);
console.log(`Twitter Card errors: ${twitterErrors}`);
console.log(`Hreflang errors: ${hreflangErrors}`);

// 3. Check for any sitemap URL that has no corresponding HTML file
const unmappedSitemapUrls = sitemapLocs.filter(u => !pageCanonicals.includes(u));
if (unmappedSitemapUrls.length > 0) {
  console.error(`FAIL: Found URLs in sitemap without matching page canonical:`, unmappedSitemapUrls);
} else {
  console.log(`PASS: 100% 1-to-1 match between Sitemap.xml and Page Canonicals!`);
}
