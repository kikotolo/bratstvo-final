module.exports = {
    name: 'lock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'lock',
    examples: ['lock'],
    description: 'Trancar a sala actual!',
    async run(client, message, args) {
        await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false});
        await message.reply({ content: 'A sala foi trancada'});
    },
    async runInteraction(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false});
        await interaction.reply({ content: 'A sala foi trancada'});
    }
};