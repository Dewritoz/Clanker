const { name } = require("../../events/client/interactionCreate");

module.exports = {
  data: {
    name: "youtube",
    description: "Sends Dew's YouTube link",
  },
  async execute(interaction) {
    const youtubeLink = "https://www.youtube.com/Dewritoz";
    await interaction.reply({
      content: `Check out my YouTube channel: ${youtubeLink}`,
    });
  },
};
