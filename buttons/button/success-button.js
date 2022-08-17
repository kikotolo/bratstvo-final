module.exports = {
    name: 'success-button',
    async runInteraction(client, interaction) {
        await interaction.reply({ content: 'Sucesso enfim acertas-te no botão correto!'});
    },
};
