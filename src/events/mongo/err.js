const chalk = require("chalk");

module.exports = {
  name: "err",
  once: false,
  execute(err) {
    console.log(
      chalk.redBright(
        `[Database Status]: An error has occured with the database connection: \n${err}`
      )
    );
  },
};
