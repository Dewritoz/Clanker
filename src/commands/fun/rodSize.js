const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rodsize")
    .setDescription(`Measure your or someone's rod size`)
    .addUserOption((option) =>
      option.setName("user").setDescription(`Provide User`)
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("user") || interaction.member;
    const displayName = member.displayName;

    const measuring = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle(":hourglass: Measuring")
      .setDescription(`Stand still, dirty CLANKER`);
    await interaction.reply({ embeds: [measuring] });

    const dots = [".", "..", "..."];
    for (let i = 0; i < dots.length; i++) {
      await new Promise((res) => setTimeout(res, 500));
      measuring.setTitle(`:hourglass: Measuring${dots[i]}`);
      await interaction.editReply({ embeds: [measuring] });
    }

    await new Promise((res) => setTimeout(res, 1000));
    const sizeOptions = [
      `8D`,
      `8=D`,
      `8=====D`,
      `8=========D`,
      `8==============D`,
      `8=================D`,
      `8=======================D`,
      `8==============================D`,
      `8======================================================D`,
    ];
    const sizeResponse =
      sizeOptions[Math.floor(Math.random() * sizeOptions.length)];

    const comments = ["huge bro", "_**THICC**_", "solid steel rod dude", "dawg..."];
    const commentResponse =
      comments[Math.floor(Math.random() * comments.length)];

    const resultEmbed = new EmbedBuilder()
      .setColor("#FFC0CB")
      .setTitle(":straight_ruler: Rod Size Checker 101")
      .setDescription(
        `**${displayName}'s** rod length:\n${sizeResponse}\n\n${commentResponse}`
      )
      .setThumbnail("https://files.catbox.moe/2a8pgr.gif");

    await interaction.editReply({ embeds: [resultEmbed] });
  },
};
