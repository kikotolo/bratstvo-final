const Logger = require('../../utils/Logger');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.client(`💥 Bratstvo Activate 💥para ${usersCount} Utilizadores em ${guildsCount.size} servidores!`);
        client.user.setPresence({ activities: [{ name: "Criando sonhos", type: "LISTENING" }], status: "dnd" });
        
        const devGuild = await client.guilds.cache.get('945433949499453470');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },
};