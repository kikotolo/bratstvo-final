module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join','thread leave'],
    description: 'Comando de tópicos!',
    async run(client, message, args) {  
        let thread = message.channel;
        if (!thread.isThread()) return interaction.reply('Impossivel de usar este comando pois não estas em nenhum tópico');;
        if (!args[0] || !args[0].match(/^(join|leave|archive|unarchive|delete)$/)) 
        return message.reply(
            'Utiliza um sub comando vlaido (join|leave|archive|unarchive|delete)'
        ); 

        if (args[0] === 'join') {
            message.reply('O bratstvo entrou no Tópico!');
            if (thread.joinable) await thread.join();
        } else if (args[0] === 'leave') {
            message.reply('O bratstvo saiu do Tópico!');
            await thread.leave();
        } else if (args[0] === 'archive') {
            await message.reply('O bratstvo arquivou o Tópico!');
            await thread.setArchived(true);
        } else if (args[0] === 'unarchive') {
            message.reply('O bratstvo desarquivou o Tópico!');
            await thread.setArchived(false);
        } else if (args[0] === 'delete') {
            const channelId = args[1];
            if (!args[1]) return message.reply('Especifica o id do canal!');
            const logChannel = client.channels.cache.get(channelId);
            await logChannel.send(`O Bratstvo apagou o Tópico: ${thread.name}!`);
            await thread.delete();
        }
    
    },
    options: [
        {
            name: 'join',
            description: 'Juntar-se ao Tópico',
            type: 'SUB_COMMAND',
        },
        {
            name: 'leave',
            description: 'Sair do Tópico',
            type: 'SUB_COMMAND',
        },
        {
            name: 'archive',
            description: 'Arquivar o Tópico',
            type: 'SUB_COMMAND',
        },
        {
            name: 'unarchive',
            description: 'Desarquivar um Tópico',
            type: 'SUB_COMMAND',
        },
        {
            name: 'delete',
            description: 'Apagar o Tópico',
            type: 'SUB_COMMAND',
            options: [ { name: 'channel', type: 'STRING', description: 'id do channel', require: true} ]
        },
    ],
    async runInteraction(client, interaction) {
        let thread = interaction.channel;
        if (!thread.isThread()) return interaction.reply('Impossivel de usar este comando pois não estas em nenhum tópico');

        if (interaction.options.getSubcommand() === 'join') {
            interaction.reply('O bratstvo entrou no Tópico!');
            if (thread.joinable) await thread.join();
        } else if (interaction.options.getSubcommand() === 'leave') {
            interaction.reply('O bratstvo saiu do Tópico!');
            await thread.leave();
        } else if (interaction.options.getSubcommand() === 'archive') {
            await interaction.reply('O bratstvo arquivou o Tópico!');
            await thread.setArchived(true);
        } else if (interaction.options.getSubcommand() === 'unarchive') {
            interaction.reply('O bratstvo desarquivou o Tópico!');
            await thread.setArchived(false);
        } else if (interaction.options.getSubcommand() === 'delete') {
            const channelId = interaction.options.getString('channel');
            const logChannel = client.channels.cache.get(channelId);
            await logChannel.send(`O Bratstvo apagou o Tópico: ${thread.name}!`);
            await thread.delete();
        }
    }
};