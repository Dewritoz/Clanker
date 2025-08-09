const { SlashCommandBuilder } = require("discord.js");
const { getOrCreateUserEconomy } = require("../../data/userEconomy");
const { buildBalanceEmbed } = require("../../helpers/balanceEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Show your wallet and bank balances"),
  async execute(interaction) {
    await interaction.deferReply();
    const user = await getOrCreateUserEconomy(interaction.user.id);
    const balanceEmbed = buildBalanceEmbed(interaction.user, user.wallet);
    await interaction.editReply({ embeds: [balanceEmbed] });
  },
};
