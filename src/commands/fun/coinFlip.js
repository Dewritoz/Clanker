const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin and see the result!"),

  async execute(interaction) {
    const loadingEmbed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle(":coin: Coin Flip")
      .setDescription("Flipping the coin!");

    await interaction.reply({ embeds: [loadingEmbed] });

    const dots = [".", "..", "..."];
    for (let i = 0; i < dots.length; i++) {
      await new Promise((res) => setTimeout(res, 500));
      loadingEmbed.setTitle(`:coin: Coin Flip${dots[i]}`);
      await interaction.editReply({ embeds: [loadingEmbed] });
    }

    await new Promise((res) => setTimeout(res, 1000));

    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    const resultEmbed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(":coin: Coin Flip Result")
      .setDescription(`The coin landed on **${result}**!`)
      .setThumbnail("https://files.catbox.moe/6j940t.gif")
      .setFooter({
        text: `Flipped by ${interaction.member.displayName}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.editReply({ embeds: [resultEmbed] });
  },
};
