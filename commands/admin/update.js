const { Guild } = require("../../models/index");

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    examples: ['update'],
    description: 'Meter em dia os novos dados na base!',
    async run(client, message, args) {
        await Guild.updateMany({}, {'$set': {'testChannel': '1007041529308790804' }, upsert: true});
        message.reply('Novos dados adicionados a base de dados');
    },
    async runInteraction(client, interaction) {
        await Guild.updateMany({}, {'$set': {'testChannel': '1007041529308790804' }, upsert: true});
        interaction.reply('Novos dados adicionados a base de dados');
    },
};