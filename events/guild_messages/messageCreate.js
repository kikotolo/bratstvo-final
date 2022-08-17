const ownerId = '758288277220098090'

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        let guildSettings = await client.getGuild(message.guild);

        if (!guildSettings) {
            await client.createGuild(message.guild);
            guildSettings = await client.getGuild(message.guild);
            return message.reply('O Bratstvo meteu em dia a base de dados do servidor, volta a usar o comando!');
        }

        const prefix = guildSettings.prefix;
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
       
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        if (cmdName.length == 0) return;

        let cmd = client.commands.get(cmdName);
        if (!cmd) return message.reply('⛔ Este comando não existe!');

        if (cmd.ownerOnly) {
            if (!message.author.id != ownerId) return message.reply('As unicas pessoas que podem usar este comando são os fundadores da BRATSTVO');
        }

        if (!message.member.permissions.has([cmd.permissions])) return message.reply(`Não tens as permissões necessarias (\`${cmd.permissions.join(', ')}\`) para usar este comando`);

        if (cmd) cmd.run(client, message, args, guildSettings);
    },
};