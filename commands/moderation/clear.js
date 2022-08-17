module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [amount] <@target>',
    examples: ['clear 50', 'clear 50 @kikotolo'],
    description: 'Apagar um certo numero de mensagens na sala ou de um membro!',
    async run(client, message, args) {
        const amountToDelete = args[0];
        if (isNaN(amountToDelete)) return message.reply('Tens que por um `\Numero\`')
        if (args[0] || amountToDelete > 100 || amountToDelete < 0) return message.reply('O `\Numero\` deve ser maior que 1 e inferior a 100');
        const target = message.mentions.users.find(u => u.id);

        const messagesToDelete = await message.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });

            await message.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                message.channel.send(`Apaguei ${messages.size} mensagens do membro ${target}`);
            });
        }   else {
            await message.channel.bulkDelete(amountToDelete, true).then(messages => {
                message.channel.send(`Apaguei ${messages.size} mensagens nesta sala!`);
            });
        };
    },
    options: [
        {
            name: 'message',
            description: 'Numero de mensagens a apagar',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: 'Seleciona o membro autor das mensagens a ser apagadas',
            type: 'USER',
            required: false,
        },
    ],
    async runInteraction(client, interaction) {
        const amountToDelete = interaction.options.getNumber('message');
        if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply('O `\Numero\` deve ser maior que 0 e inferior a 100');
        const target = interaction.options.getMember('target');

        const messagesToDelete = await interaction.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                interaction.reply(`Apaguei ${messages.size} mensagens do membro ${target}`);
            });
        }   else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply(`Apaguei ${messages.size} mensagens nesta sala!`);
            });
        }
    }
};