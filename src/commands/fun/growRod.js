const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("growrod")
    .setDescription("Grow your or someone's rod size")
    .addUserOption((option) =>
      option.setName("user").setDescription("Provide User")
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("user") || interaction.member;
    const displayName = member.displayName;

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const measuring = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle(":hourglass: Growing")
      .setDescription(`Hold on, you wire back silver number crunching CLANKER`);
    await interaction.reply({ embeds: [measuring] });

    const dots = [".", "..", "..."];
    for (const d of dots) {
      await sleep(450);
      measuring.setTitle(`:hourglass: Growing${d}`);
      await interaction.editReply({ embeds: [measuring] });
    }

    const minLen = 1;
    const maxLen = 50;
    const finalLen = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

    const maxFrames = 18;
    const frames = Math.min(finalLen, maxFrames);
    const step = Math.max(1, Math.ceil(finalLen / frames));

    for (let len = step; len < finalLen; len += step) {
      const shaft = "8" + "=".repeat(len) + "D";
      const frame = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle(":hourglass: Growing…")
        .setDescription(`${shaft}`);
      await sleep(150);
      await interaction.editReply({ embeds: [frame] });
    }

    const sizeStr = "8" + "=".repeat(finalLen) + "D";

    const comments = ["enjoy your brand new rod", "excalibur dawg"];
    let comment = comments[Math.floor(Math.random() * comments.length)];
    if (finalLen >= 35) comment = "my condolences to other clankers";
    else if (finalLen >= 25) comment = "certified menace";
    else if (finalLen <= 3) comment = "starter pack";

    const resultEmbed = new EmbedBuilder()
      .setColor("#FFC0CB")
      .setTitle(":straight_ruler: Rod Size Grower 101")
      .setDescription(
        `**${displayName}**'s rod length:\n${sizeStr}\n\n${comment}`
      )
      .setThumbnail("https://files.catbox.moe/ms2pv0.gif");

    await sleep(250);
    await interaction.editReply({ embeds: [resultEmbed] });
  },
};
