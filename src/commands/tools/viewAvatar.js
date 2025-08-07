const {
  ContextMenuCommandBuilder,
  ApplicationCommandType
} = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('View Avatar')
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    await interaction.reply({
      content: `${interaction.targetUser.displayAvatarURL()}`
    });
  }
};
