const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.richPresence = () => {
    const options = [
      {
        type: ActivityType.Playing,
        name: "with other clankers",
        status: "online",
      },
      {
        type: ActivityType.Watching,
        name: "bot slammage",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        name: "to AI generated rap",
        status: "online",
      },
    ];

    const choice = options[Math.floor(Math.random() * options.length)];

    client.user.setPresence({
      activities: [
        {
          name: choice.name,
          type: choice.type,
        },
      ],
      status: choice.status,
    });
  };
};
