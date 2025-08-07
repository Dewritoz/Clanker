const chalk = require("chalk");

module.exports = {
  name: "connected",
  once: false,
  execute() {
    console.log(chalk.greenBright(`[Database Status]: Connected.`));
  },
};
