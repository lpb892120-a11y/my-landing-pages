import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import fs from "node:fs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const host = "bajiejichang.cfd";
const origin = "https://" + host;

// 1. Generate or read key
let keyFile = fs.readdirSync(root).find(f => /^[a-f0-9]{32}\.txt$/.test(f));
let key = '';

if (!keyFile) {
  key = crypto.randomBytes(16).toString('hex');
  fs.writeFileSync(join(root, `${key}.txt`), key + '\n');
  console.log(`Created IndexNow key file: ${key}.txt`);
} else {
  key = fs.readFileSync(join(root, keyFile), 'utf8').trim();
}

// 2. Read URLs from sitemap.xml
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

console.log(`Submitting ${urls.length} URLs to IndexNow for ${host}...`);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: origin + "/" + key + ".txt",
    urlList: urls
  })
});

console.log(`IndexNow response status: ${response.status}`);
if (response.status === 200 || response.status === 202) {
  console.log(`✓ Successfully submitted ${urls.length} URLs to Bing & IndexNow!`);
} else {
  const text = await response.text();
  console.log(`IndexNow details: ${text}`);
}
