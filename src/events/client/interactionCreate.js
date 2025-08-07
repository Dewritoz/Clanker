module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return new Error("Command not found");

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something has gone wrong while executing this command.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error(`No button found with the custom ID: ${customId}`);

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something has gone wrong while executing this button.`,
          ephemeral: true,
        });
      }
    }
  },
};
