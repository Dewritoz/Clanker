module.exports = {
  data: {
    name: "lolProfiles",
  },
  async execute(interaction) {
    const selectedLinks = interaction.values.join("\n");

    await interaction.reply({
      content: `**Here is what I got:**\n${selectedLinks}`,
    });
  },
};
