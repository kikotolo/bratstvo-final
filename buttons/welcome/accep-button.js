module.exports = {
    name: 'accept-button',
    async runInteraction(client, interaction) {
        await interaction.member.roles.add('956734028604665927');
        await interaction.reply({ content: 'Aceitas-te as Regras. Agora ja podes disfrutar do nosso servidor mas não te esqueças de comprir as regras!', ephemeral: true});
    },
};
