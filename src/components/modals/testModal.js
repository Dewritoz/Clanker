module.exports = {
  data: {
    name: "testModal",
  },
  async execute(interaction) {
    await interaction.reply({
      content: `You submitted the modal with the following values:\n${interaction.fields.getTextInputValue(
        "testInput"
      )}`,
    });
  },
};
