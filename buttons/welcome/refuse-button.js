module.exports = {
    name: 'refuse-button',
    async runInteraction(client, interaction) {
        try {
            await interaction.member.send('Não aceitas-te as regras. Dei-te kick!');
        }catch(e) {
            await interaction.reply(`O membro ${interaction.member.displayName} não aceitou as regras. Dei-lhe kick!`);
        }
        await interaction.member.kick('Ele(a) não aceitou as regras do servidor');
    },
};
