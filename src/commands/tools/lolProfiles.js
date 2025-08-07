const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lol-profiles")
    .setDescription("Retrieves League of Legends profile links from op.gg"),

  async execute(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("lolProfiles")
      .setMinValues(1)
      .setMaxValues(5)
      .setPlaceholder("Choose your summoner(s)")
      .addOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("ABGsInYourArea")
          .setValue("https://op.gg/lol/summoners/euw/ABGsInYourArea-balls"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Dew")
          .setValue("https://op.gg/lol/summoners/euw/Dew-NULL"),
        new StringSelectMenuOptionBuilder()
          .setLabel("DualTranspose")
          .setValue("https://op.gg/lol/summoners/euw/DualTranspose-89637"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Él Pikmin go brr")
          .setValue(
            "https://op.gg/lol/summoners/euw/%C3%89l%20Pikmin%20go%20brr-EUW"
          ),
        new StringSelectMenuOptionBuilder()
          .setLabel("GRR HEHEHEHA")
          .setValue("https://op.gg/lol/summoners/euw/GRR%20HEHEHEHA-EUW"),
        new StringSelectMenuOptionBuilder()
          .setLabel("smxbx")
          .setValue("https://op.gg/lol/summoners/euw/smxbx-0000"),
        new StringSelectMenuOptionBuilder()
          .setLabel("UltraHD")
          .setValue("https://op.gg/lol/summoners/euw/UltraHD-g59"),
      ]);

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle("<:KYS:1185984070929358878> LoL Profile Links")
      .setThumbnail(
        "https://media.tenor.com/zRKqj0RDKP8AAAAM/garen-mog-garen.gif"
      )
      .setDescription(
        "**[All] DemaciaLover69 (Garen):** Lux will be laid tonight <3"
      )
      .setFooter({ text: "Data provided by op.gg | EUW Region" });

    await interaction.reply({
      content:
        "**Select one or more summoners below to get their profile links:**",
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
