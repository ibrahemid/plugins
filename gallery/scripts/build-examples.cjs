#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const PLUGIN_ROOT = path.join(__dirname, '..', '..', 'plugins', 'to-html');
const { classify } = require(path.join(PLUGIN_ROOT, 'lib', 'classifier'));
const { dispatchRender } = require(path.join(PLUGIN_ROOT, 'lib', 'templates', 'dispatch'));

const DEST = path.join(__dirname, '..', 'public', 'examples', 'to-html');
const SHOT_SRC = path.join(PLUGIN_ROOT, 'docs', 'screenshots');
const SHOT_DEST = path.join(__dirname, '..', 'public', 'screenshots');

function load(file) {
  return fs.readFileSync(path.join(__dirname, 'examples', file), 'utf8');
}

function copyScreenshots() {
  if (!fs.existsSync(SHOT_SRC)) {
    console.log('[!] no screenshots dir at ' + SHOT_SRC + ', skipping copy');
    return 0;
  }
  fs.mkdirSync(SHOT_DEST, { recursive: true });
  let count = 0;
  for (const file of fs.readdirSync(SHOT_SRC)) {
    if (!/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(file)) continue;
    if (file.startsWith('tpl-')) continue;
    fs.copyFileSync(path.join(SHOT_SRC, file), path.join(SHOT_DEST, file));
    count += 1;
  }
  return count;
}

function main() {
  fs.mkdirSync(DEST, { recursive: true });

  const cases = [
    { name: 'prose', file: 'prose.md' },
    { name: 'plan', file: 'plan.md' },
    { name: 'comparison', file: 'comparison.md' },
    { name: 'explainer', file: 'explainer.md' },
    { name: 'diagram', file: 'diagram.md' }
  ];

  for (const c of cases) {
    const md = load(c.file);
    const cls = classify(md);
    if (cls.template === 'skip') {
      console.log('[!] ' + c.name + ' skipped by classifier');
      continue;
    }
    const rendered = dispatchRender({
      template: cls.template,
      markdown: cls.source || md,
      meta: { turnIndex: 0, sessionId: c.name, project: 'gallery' },
      signals: cls.signals,
      override: cls.override
    });
    const out = path.join(DEST, c.name + '.html');
    fs.writeFileSync(out, rendered.html);
    console.log('✓ ' + c.name + ' → ' + path.relative(process.cwd(), out) + ' (' + rendered.html.length + ' bytes, template=' + cls.template + ')');
  }

  const shotCount = copyScreenshots();
  console.log('✓ ' + shotCount + ' screenshot(s) copied to ' + path.relative(process.cwd(), SHOT_DEST));
}

main();
