const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'poll [pergunta]',
    examples: ['poll', 'poll Hoje a noite jogamos um FallGuys?'],
    description: 'Faz a tua sondagem!',
    run(client, message, args) {
       if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) 
       return message.reply(
        'Utiliza um evento valido (\`guildMemberAdd\`/\`guildMemberRemove\`)'
        ); 

       if (args[0] == 'guildMemberAdd') {
        client.emit('guildMemberAdd', message.member);
        message.reply('Imite o evento guildMemberAdd');
        } else {
        client.emit('guildMemberRemove', message.member);
        message.reply('Imite o evento guildMemberRemove');
        }
    },
    options: [
        {
            name: 'title',
            description: 'Escolhe o titlo da tua sondagem',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Escreve a questão da tua sondagem',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
        .setTitle(pollTitle)
        .setColor('#009fff')
        .setDescription(pollContent)
        .setTimestamp()
        .setFooter({ text: `BRATSTVO Crew | Sondagem generada por ${interaction.user.tag}!` });

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('✅');
        poll.react('❌');
    },
};