const chalk = require('chalk');
const path = require('path');

const logger = {
  info: msg => {
    console.log(chalk.bgBlue.black('INFO'), chalk.blue(msg));
  },
  warn: msg => {
    console.log(chalk.bgYellow.black('WARN'), chalk.yellow(msg));
  },
  error: msg => {
    console.log(chalk.bgRed.black('ERROR'), chalk.red(msg));
  },
  success: msg => {
    console.log(chalk.bgGreen.black('SUCCESS'), chalk.green(msg));
  },
};

function execSync(script, stdio = 'inherit') {
  return require('child_process').execSync(script, {
    stdio
  });
}

module.exports = {
  logger,
  execSync
};
