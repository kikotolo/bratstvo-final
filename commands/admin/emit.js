module.exports = {
    name: 'emit',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'emit [eventName]',
    examples: ['emit', 'emit guildCreate'],
    description: 'imitir um evento a escolha!',
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
            name: 'event',
            description: 'Escolher um evento a imitir',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd',
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove',
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate',
                }
            ]
        }
    ],
    runInteraction(client, interaction) {
        const evtchoices = interaction.options.getString('event');

        if (evtchoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Imite o evento guildMemberAdd', ephemeral: true });
        } else if (evtchoices == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({ content: 'Imite o evento guildCreate', ephemeral: true });
        } else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Imite o evento guildMemberRemove', ephemeral: true });
        }
    }
};