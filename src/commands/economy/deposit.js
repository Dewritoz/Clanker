const { SlashCommandBuilder } = require("discord.js");
const { currency } = require("../../config/economy");
const { moveCashToBank } = require("../../data/userEconomy");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit cash into your bank")
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
      const doc = await moveCashToBank(interaction.user.id, amount);
      await interaction.editReply(
        `Deposited ${currency}${amount}\nWallet: ${currency}${doc.wallet.cash}\nBank: ${currency}${doc.wallet.bank}`
      );
    } catch (e) {
      if (e.message === "insufficientCash")
        return interaction.editReply("Insufficient Cash");
      await interaction.editReply("Deposit Failed");
    }
  },
};
