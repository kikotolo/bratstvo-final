module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@member] [reason]',
    examples: ['ban @kikotolo motivo'],
    description: 'Banir um membro com um motivo!',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Especifica um membro a levar ban');
        if (!args[1]) return message.reply('Especifica o motivo de levar ban');

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if (!target.bannable) return message.reply('Este membro não pode levar ban do bot');

        target.ban({ reason });
        message.channel.send(`O membro ${target} levou ban!`);
    },
    options: [
        {
            name: 'target',
            description: 'O membro levou ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Motivo do ban',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.bannable) return interaction.reply('Este membro não pode levar ban do bot');

        target.ban({ reason });
        interaction.reply(`O membro ${target} levou ban!`);
    }
};