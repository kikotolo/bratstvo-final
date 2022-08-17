module.exports = {
    name: 'kick',
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@member] [reason]',
    examples: ['kick @kikotolo motivo'],
    description: 'Expulsar um membro com um motivo!',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Especifica um membro a levar kick');
        if (!args[1]) return message.reply('Especifica o motivo de levar kick');

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if (!target.kickable) return message.reply('Este membro não pode levar kick do bot');

        target.kick(reason);
        message.channel.send(`O membro ${target} levou kick!`);
    },
    options: [
        {
            name: 'target',
            description: 'O membro levou kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Motivo do kick',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.kickable) return interaction.reply('Este membro não pode levar kick do bot');

        target.kick(reason);
        interaction.reply(`O membro ${target} levou kick!`);
    }
};