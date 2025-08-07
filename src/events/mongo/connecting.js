const chalk = require("chalk");

module.exports = {
  name: "connecting",
  once: false,
  execute() {
    console.log(chalk.hex("#00ffff")(`[Database Status]: Connecting...`));
  },
};
