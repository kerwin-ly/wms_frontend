#!/usr/bin/env node

const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginNpmImport = require('less-plugin-npm-import');
const fs = require('fs-extra');
const path = require('path');
const vars = require('./vars');

const root = path.join(__dirname, '../');
const themePath = path.join(root, './src/app/styles/global.less');
const themeContent = `
@import '${themePath}';
`;

function generateTheme(vars, fileName) {
  return less
    .render(themeContent, {
      javascriptEnabled: true,
      plugins: [new LessPluginNpmImport({ prefix: '~' }), new LessPluginCleanCSS({ advanced: true })],
      modifyVars: {
        ...vars
      },
    })
    .then(data => {
      fs.writeFileSync(path.join(root, `./src/assets/${fileName}`), data.css);
    })
    .catch(e => {
      console.log(e);
    });
}

function generateAllTheme() {
  return generateTheme(vars.dark, 'dark.css');
}

generateAllTheme();
