const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription(`Returns a button.`),
  async execute(interaction) {
    const button = new ButtonBuilder()
      .setCustomId("youtube")
      .setLabel("Click Me!")
      .setStyle(ButtonStyle.Success);

    await interaction.reply({
      content: "example button",
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
