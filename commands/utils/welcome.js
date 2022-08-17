const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('accept-button')
            .setLabel('Aceitar')
            .setStyle('SUCCESS'),

        new MessageButton()
            .setCustomId('refuse-button')
            .setLabel('Recusar')
            .setStyle('DANGER'),
    )

    const welcomeEmbed = new MessageEmbed()
        .setTitle('Regras do servidor')
        .setColor('#00f8f8')
        .setDescription('Regras ...')
        .setFooter({ text: 'Bem-vindo(a) a **MAFIA**'})
        .setTimestamp()

module.exports = {
    name: 'welcome',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'welcome',
    examples: ['welcome'],
    description: 'O comando welcome envia as regras!',
    async run(client, message, args) {
        await message.channel.send({ embeds: [welcomeEmbed], components: [buttons] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
    },
};