module.exports = {
    name: 'primary-button',
    async runInteraction(client, interaction) {
        await interaction.reply({ content: 'Sou apenas o primeiro botão!'});
    },
};
