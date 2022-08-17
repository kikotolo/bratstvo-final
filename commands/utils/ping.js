const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description: 'O comando ping mostra a latencia do BOT e do API!',
    async run(client, message, args) {
        const tryPong = await message.channel.send('A tentar Pong... aguarda um momento!');

        const embed = new MessageEmbed()
            .setTitle('🏓 Pong')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#00f8f8')
            .addFields(
            { name: 'Latencia API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
            { name: 'Latencia BOT', value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        tryPong.edit({ content: ' ', embeds: [embed] });
    },
    async runInteraction(client, interaction) {
        const tryPong = await interaction.reply({ content:'A tentar Pong... aguarda um momento!', fetchReply: true });
        const embed = new MessageEmbed()
            .setTitle('🏓 Pong')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#00f8f8')
            .addFields(
            { name: 'Latencia API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
            { name: 'Latencia BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            
        interaction.editReply({ content: ' ', embeds: [embed] });
    },
};