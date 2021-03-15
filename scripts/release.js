const { version } = require('../package.json');
const read = require('readline-sync');
const { execSync, logger } = require('./util');

function genChangelog() {
  logger.info('Generating changelog [Start]');
  execSync('npm run changelog');
  let completeEditing = false;
  while (!completeEditing) {
    const result = read.question(
      chalk.bgYellow.black(
        'Please manually update docs/changelog. Press [Y] if you are done:',
      ) + '  ',
    );
    if (result.trim().toLowerCase() === 'y') {
      completeEditing = true;
    }
  }

  logger.success('Generating changelog [End]');
}

execSync(`git checkout -b release/${version}`);
execSync('git add .');
execSync(`git commit -m "release(${version}): release ${version}"`);
execSync(`git push origin release/${version}`);
execSync(`git tag ${version}`);
execSync(`git push origin ${version}`);

logger.success('Done');
