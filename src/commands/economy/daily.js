const { SlashCommandBuilder } = require("discord.js");
const { currency, dailyAmount } = require("../../config/economy");
const { claimDaily } = require("../../data/userEconomy");
const { buildBalanceEmbed } = require("../../helpers/balanceEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily reward"),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const doc = await claimDaily(interaction.user.id);
      const balanceEmbed = buildBalanceEmbed(interaction.user, doc.wallet);
      await interaction.editReply({
        content: `Claimed ${currency}${dailyAmount}.`,
        embeds: [balanceEmbed]
      });
    } catch (e) {
      if (e.message === "dailyCooldown") {
        const mins = Math.ceil(e.waitMs / 60000);
        return interaction.editReply(`Daily on cooldown. Try again in ~${mins}m`);
      }
      await interaction.editReply("Error claiming daily.");
    }
  },
};
