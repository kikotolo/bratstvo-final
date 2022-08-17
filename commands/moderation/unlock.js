module.exports = {
    name: 'unlock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'unlock',
    examples: ['unlock'],
    description: 'Destrancar a sala actual!',
    async run(client, message, args) {
        await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true});
        await message.reply({ content: 'A sala foi Destrancada'});
    },
    async runInteraction(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true});
        await interaction.reply({ content: 'A sala foi Destrancada'});
    }
};