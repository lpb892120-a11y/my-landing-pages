const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = findHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files.`);

let errors = 0;
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(rootDir, file);
  
  // 1. Check title and description
  if (!content.includes('<title>')) {
    console.error(`Missing <title> in ${relativeFile}`);
    errors++;
  }
  if (!content.includes('name="description"')) {
    console.error(`Missing description in ${relativeFile}`);
    errors++;
  }
  if (!content.includes('rel="canonical"')) {
    console.error(`Missing canonical in ${relativeFile}`);
    errors++;
  }
  
  // 2. Check JSON-LD
  if (!content.includes('application/ld+json')) {
    console.warn(`No JSON-LD in ${relativeFile}`);
  }
  
  // 3. Check target link
  if (!content.includes('https://jichang-go.org/go.php')) {
    console.error(`Missing target jump link in ${relativeFile}`);
    errors++;
  }
});

console.log(`Verification completed with ${errors} errors.`);
