const fs = require('fs');

const buf = fs.readFileSync('index.html');
let contentStr = '';
if (buf[0] === 0xff && buf[1] === 0xfe) {
  contentStr = buf.toString('utf16le');
} else {
  contentStr = buf.toString('utf8');
}

// Remove BOM if present
if (contentStr.charCodeAt(0) === 0xfeff) {
  contentStr = contentStr.slice(1);
}

// Write back as pure UTF-8 without BOM
fs.writeFileSync('index.html', contentStr, 'utf8');

console.log('Successfully converted index.html to clean UTF-8.');

