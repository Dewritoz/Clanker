const { SlashCommandBuilder } = require("discord.js");
const { currency } = require("../../config/economy");
const { moveBankToCash } = require("../../data/userEconomy");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw from your bank to wallet")
    .addIntegerOption((o) =>
      o
        .setName("amount")
        .setDescription("amount")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount", true);
    await interaction.deferReply();
    try {
      const doc = await moveBankToCash(interaction.user.id, amount);
      await interaction.editReply(
        `Withdrew ${currency}${amount}.\nWallet: ${currency}${doc.wallet.cash}\nBank: ${currency}${doc.wallet.bank}`
      );
    } catch (e) {
      if (e.message === "insufficientBank")
        return interaction.editReply("Insufficient Bank Balance");
      await interaction.editReply("Withdraw Failed");
    }
  },
};
