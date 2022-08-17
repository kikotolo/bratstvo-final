module.exports = {
    name: 'danger-button',
    async runInteraction(client, interaction) {
        await interaction.reply({ content: 'Não devias ter carregado eu sou perigoso!'});
    },
};
