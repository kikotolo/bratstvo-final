const ownerId = '758288277220098090';

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        let guildSettings = await client.getGuild(interaction.guild);

        if (!guildSettings) {
            await client.createGuild(interaction.guild);
            guildSettings = await client.getGuild(interaction.guild);
            return interaction.reply('O Bratstvo meteu em dia a base de dados do servidor, volta a usar o comando!');
        }

        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('⛔ Este comando não existe!');

            if (cmd.ownerOnly) {
                if (interaction.user.id != ownerId) return message.reply('As unicas pessoas que podem usar este comando são os fundadores da BRATSTVO');
            }

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ contente: `Não tens as permissões necessarias (\`${cmd.permissions.join(', ')}\`) para usar este comando`, ephemeral: true });

            cmd.runInteraction(client, interaction, guildSettings);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply('⛔ Este botão não existe!'); 
            btn.runInteraction(client, interaction, guildSettings);
        } else if (interaction.isSelectMenu()) {
            const selectMenu = client.selects.get(interaction.customId);
            if (!selectMenu) return interaction.reply('⛔ Este menu não existe!'); 
            selectMenu.runInteraction(client, interaction, guildSettings);
        }
    },
};