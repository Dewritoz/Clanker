const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.richPresence = () => {
    const options = [
      {
        type: ActivityType.Playing,
        name: "with my metal rod",
        status: "online",
      },
      {
        type: ActivityType.Watching,
        name: "AI generated AVs",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        name: "to clanker ASMR",
        status: "online",
      },
      {
        type: ActivityType.Streaming,
        name: "bot slammage",
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
