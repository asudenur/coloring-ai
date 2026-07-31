const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'node_modules');
const pat = /(^|[^\w])#[A-Za-z0-9_]+|\bprivate\b/;
let count = 0;
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name === '.bin') continue;
      walk(p);
      if (count >= 50) return;
    } else if (/\.(js|jsx|ts|tsx)$/.test(name)) {
      const txt = fs.readFileSync(p, 'utf8');
      if (pat.test(txt)) {
        console.log(p);
        count += 1;
        if (count >= 50) return;
      }
    }
    if (count >= 50) return;
  }
}
try {
  walk(root);
} catch (e) {
  console.error(e);
}
