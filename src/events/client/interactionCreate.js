const { InteractionType } = require("discord.js");

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
      if (!button)
        return new Error(`No button found with the custom ID: ${customId}`);

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something has gone wrong while executing this button.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const selectMenu = selectMenus.get(customId);
      if (!selectMenu)
        return new Error(
          `No select menu found with the custom ID: ${customId}`
        );

      try {
        await selectMenu.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something has gone wrong while executing this select menu.`,
          ephemeral: true,
        });
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal)
        return new Error(`No modal found with the custom ID: ${customId}`);

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something has gone wrong while executing this modal.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command)
        return new Error(
          `No context menu command found with the name: ${commandName}`
        );

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something has gone wrong while executing this context menu command.`,
          ephemeral: true,
        });
      }
    }
  },
};
