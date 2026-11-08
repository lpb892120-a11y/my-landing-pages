import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const host = "ssrdogjic.homes";
const origin = "https://" + host;
const key = (await readFile(join(root, "2b142fda44a3dd1b82f373b2886b987b.txt"), "utf8")).trim();

if (!/^[a-f0-9]{32}$/.test(key)) {
  throw new Error("The IndexNow key file must contain the configured 32-character hexadecimal key.");
}

const suppliedUrls = process.argv.slice(2);
let urls = suppliedUrls;
if (urls.length === 0) {
  const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

urls = [...new Set(urls)];
if (urls.length === 0 || urls.length > 10000) {
  throw new Error("Provide between 1 and 10,000 URLs, or add URLs to sitemap.xml.");
}

for (const value of urls) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== host || url.hash) {
    throw new Error("Only canonical HTTPS URLs on " + host + " may be submitted: " + value);
  }
}

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

if (!response.ok) {
  const detail = await response.text();
  throw new Error("IndexNow returned HTTP " + response.status + (detail ? ": " + detail : ""));
}

console.log("IndexNow accepted " + urls.length + " URL(s) for " + host + " (HTTP " + response.status + ").");

