import fs from 'fs';
import path from 'path';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';

const acorn = Parser.extend(jsx());

const ROOT = path.resolve('src');
const exts = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx', '/index.ts', '/index.tsx'];

function fileExistsLike(p) {
  return exts.some(ext => fs.existsSync(p + ext));
}

function checkFile(filePath, missing) {
  const code = fs.readFileSync(filePath, 'utf8');
  let ast;
  try {
    ast = acorn.parse(code, {
      sourceType: 'module',
      ecmaVersion: 'latest',
      locations: true,
    });
  } catch {
    return;
  }

  const dir = path.dirname(filePath);

  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      const spec = node.source.value;
      if (!spec.startsWith('.')) continue;

      const targetBase = path.resolve(dir, spec);
      if (!fileExistsLike(targetBase)) {
        missing.push({
          from: path.relative(ROOT, filePath),
          importPath: spec,
        });
      }
    }
  }
}

function walk(dir, missing) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, missing);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      checkFile(full, missing);
    }
  }
}

const missing = [];
walk(ROOT, missing);

if (missing.length > 0) {
  console.error('? Missing import targets:');
  for (const m of missing) {
    console.error(`  - ${m.from} → ${m.importPath}`);
  }
  process.exit(1);
} else {
  console.log('? All relative imports resolved successfully.');
}
