const { Guild } = require("../../models/index");

module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    examples: ['reload'],
    description: 'Relançar o Bratstvo!',
    async run(client, message, args) {
       // const devGuild = await client.guilds.cache.get('945433949499453470');
       // devGuild.commands.set([]);
        await interaction.reply('💥 Bratstvo Activate 💥');
        return process.exit();  
    },
    async runInteraction(client, interaction) {
       // const devGuild = await client.guilds.cache.get('945433949499453470');
       // devGuild.commands.set([]);
        await interaction.reply('💥 Bratstvo Activate 💥');
        return process.exit();  
    },
};