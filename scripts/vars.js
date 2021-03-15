#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

function gen(type) {
  const ngZorroAntdStylePath = path.join(__dirname, '../node_modules/ng-zorro-antd/style');
  const ngZorro = `
  ${fs.readFileSync(path.join(ngZorroAntdStylePath, 'color', 'colors.less'), 'utf8')}
  ${fs.readFileSync(path.join(ngZorroAntdStylePath, 'themes', `${type}.less`), 'utf8')}
  `;
  const bixiStylePath = path.join(__dirname, '../node_modules/@bixi/core/style/');
  const ngBixi = `
  ${fs.readFileSync(path.join(bixiStylePath, `/themes/color.less`), 'utf8')}
  ${fs.readFileSync(path.join(bixiStylePath, `${type}.less`), 'utf8')}
  `;

  return lessToJs(`${ngZorro}${ngBixi}`, {
    stripPrefix: true,
    resolveVariables: false,
  });
}

module.exports = {
  dark: gen('dark')
};
