const { EmbedBuilder } = require("discord.js");
const { currency } = require("../config/economy");

function buildBalanceEmbed(user, wallet) {
  const cash = wallet.cash || 0;
  const bank = wallet.bank || 0;
  const total = cash + bank;
  return new EmbedBuilder()
    .setAuthor({
      name: `${user.username}'s balance`,
      iconURL: user.displayAvatarURL(),
    })
    .addFields(
      { name: "Wallet", value: `${currency}${cash}`, inline: true },
      { name: "Bank", value: `${currency}${bank}`, inline: true },
      { name: "Total", value: `${currency}${total}`, inline: true }
    )
    .setTimestamp();
}

module.exports = { buildBalanceEmbed };
