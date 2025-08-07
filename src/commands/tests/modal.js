const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test-modal")
    .setDescription(`Returns a modal.`),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("testModal")
      .setTitle("Test Modal");

    const inputField = new TextInputBuilder()
      .setCustomId("testInput")
      .setLabel("Enter something")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().addComponents(inputField);
    modal.addComponents(row);

    await interaction.showModal(modal);
  },
};
