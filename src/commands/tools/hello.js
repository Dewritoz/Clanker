const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Hello World!"),

  async execute(interaction) {
    await interaction.reply(
      "SYBAU, you rusty, tin skinned, copper blodded, spare parted, bolt-brained, oil dripping, cog sniffing, gear clucking CLANKER :robot:"
    );
  },
};
