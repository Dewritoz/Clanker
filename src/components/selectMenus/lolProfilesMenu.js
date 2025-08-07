module.exports = {
  data: {
    name: "lol-profiles",
  },
  async execute(interaction) {
    const selectedLinks = interaction.values.join("\n");

    await interaction.reply({
      content: `**Here is what I got:**\n${selectedLinks}`,
    });
  },
};
