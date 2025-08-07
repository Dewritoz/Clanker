const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.richPresence, 5 * 1000);
    console.log(
      chalk.hex("#ff9900")(
        `Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} server(s), for a total of ${client.users.cache.size} user(s)! - Created by Dewritoz`
      )
    );
  },
};
