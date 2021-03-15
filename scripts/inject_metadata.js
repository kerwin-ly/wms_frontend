const { version } = require('../package.json');
const fs = require('fs');
const path = require('path');

const PATH = path.resolve(__dirname, '../src/environments/environment.prod.ts');

const VERSION =  version;
const TAG = process.env.IMAGE_TAG

function inject() {
  const envProd = fs.readFileSync(PATH)
    .toString()
    .replace('__BUILD_VERSION__', VERSION)
    .replace('__BUILD_TAG__', TAG)
  fs.writeFileSync(PATH, envProd);
}

inject();
