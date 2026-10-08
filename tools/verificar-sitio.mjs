import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../sitio/', import.meta.url));
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('index.html');
const css = read('style.css');
const js = read('script.js');
new vm.Script(js);
const context = vm.createContext({});
vm.runInContext(js.slice(0, js.indexOf('const categoryList = document.')) + '\nthis.categories = catalogCategories;', context);
const serviceStart = js.indexOf('const serviceDialogCatalog =');
const serviceEnd = js.indexOf('const serviceDialogTriggers =');
vm.runInContext(js.slice(serviceStart, serviceEnd) + '\nthis.services = serviceDialogCatalog;', context);

const files = [];
function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else files.push(path.relative(root, full).replaceAll('\\', '/'));
    }
}
walk(root);
const known = new Set(files);
const used = new Set(['index.html', 'robots.txt', 'sitemap.xml', 'CNAME', '.nojekyll']);
const missing = new Set();
function reference(value, optimized = false) {
    if (!value || /^(?:[a-z]+:|#|\/\/)/i.test(value)) return;
    let file = decodeURIComponent(value.split(/[?#]/)[0]).replace(/^\.\//, '');
    if (optimized && /\.(jpe?g|png)$/i.test(file)) file += '.webp';
    if (!file) return;
    used.add(file);
    if (!known.has(file)) missing.add(file);
}
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) reference(match[1]);
for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) reference(match[1]);
function scanData(value, optimized = false) {
    if (typeof value === 'string' && value.startsWith('Imagenes/')) reference(value, optimized);
    else if (Array.isArray(value)) value.forEach((v) => scanData(v, optimized));
    else if (value && typeof value === 'object') Object.values(value).forEach((v) => scanData(v, optimized));
}
scanData(context.categories);
scanData(context.services, true);
// Preserve literal assets used outside catalog data (fallbacks, dynamic UI).
for (const match of js.matchAll(/["'`](Imagenes\/[^"'`\r\n]+)["'`]/g)) {
    if (!match[1].includes('${')) reference(match[1], true);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
const productIds = context.categories.flatMap((c) => c.products.map((p) => p.id));
const duplicateProducts = [...new Set(productIds.filter((id, i) => productIds.indexOf(id) !== i))];
const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const hashes = new Map();
for (const file of files.filter((file) => file.startsWith('Imagenes/'))) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
    hashes.set(hash, [...(hashes.get(hash) || []), file]);
}
const unused = files.filter((file) => !used.has(file));
const report = {
    files: files.length,
    bytes: files.reduce((sum, f) => sum + fs.statSync(path.join(root, f)).size, 0),
    categories: context.categories.length,
    products: productIds.length,
    services: Object.keys(context.services).length,
    structuredData: structuredData.map((item) => item['@type']),
    missing: [...missing], duplicateIds, duplicateProducts,
    unused,
    duplicates: [...hashes.values()].filter((group) => group.length > 1),
};
console.log(JSON.stringify(report, null, 2));
if (missing.size || duplicateIds.length || duplicateProducts.length) process.exitCode = 1;
