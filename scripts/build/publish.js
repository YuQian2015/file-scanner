'use strict';
// Node module dependencies
const fs = require('fs-extra'),
  path = require('path'),
  exec = require('child-process-promise').exec;

const PACKAGE = path.resolve(path.join(__dirname, 'package.json'));
const ROOT = path.resolve(path.join(__dirname, '../../'));
const README = path.resolve(path.join(ROOT, 'README.md'));
const MAIN = path.resolve(path.join(ROOT, 'index.js'));
const DIST = path.resolve(ROOT, 'dist');

console.log(PACKAGE);
console.log(ROOT);
console.log(README);
console.log(DIST);

fs.copy(PACKAGE, path.resolve(DIST, 'package.json'))
  .then(() => console.log('copy package.json success!'))
  .catch(err => console.error(err))

fs.copy(README, path.resolve(DIST, 'README.md'))
  .then(() => console.log('copy README.md success!'))
  .catch(err => console.error(err))

fs.copy(MAIN, path.resolve(DIST, 'index.js'))
  .then(() => console.log('copy index success!'))
  .catch(err => console.error(err))

const FLAGS = '--access public'; // add any flags here if you want... (example: --tag alpha)

exec(`npm publish ${DIST} ${FLAGS}`)
  .then(() => { console.log('Done publishing!') })
  .catch(e => { console.log('Error publishing :', e); });