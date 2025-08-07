const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test-button")
    .setDescription(`Returns a button.`),
  async execute(interaction) {
    const button = new ButtonBuilder()
      .setCustomId("test-button")
      .setLabel("Click Me!")
      .setStyle(ButtonStyle.Success);

    await interaction.reply({
      content: "I have your button ready!",
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
