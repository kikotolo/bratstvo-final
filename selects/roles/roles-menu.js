module.exports = {
    name: 'roles-menu',
    async runInteraction(client, interaction) {
        await interaction.member.roles.add(interaction.values);
        await interaction.reply({ content: 'Felicitações, o Bratstvo adicionou-te um cargo!', ephemeral: false});
    },
};
