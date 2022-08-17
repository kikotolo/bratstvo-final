const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'contextual',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'Utilisar o menu contextual do Discord!',
    examples: ['Utilisar o menu contextual do Discord!'],
    type: 'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://cdn.discordapp.com/attachments/961275449491751003/1005715455262068766/robot.png' : 'https://cdn.discordapp.com/attachments/961275449491751003/1005722080299454544/kisspng-emoji-computer-icons-human-skin-color-child-clip-a-5d2094c4864097.2875888415624163245499.jpg'})
            .setColor('#00f8f8')
            .setImage(member.user.displayAvatarURL({ dynamic: true}))
            .addFields(
                {name: 'Nome', value: `${member.displayName}`, inline: true},
                {name: 'Moderador', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true},
                {name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true},
                {name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ')}` },
                {name: 'Conta criada a', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
                {name: 'Juntou-se aos MAFIOSOS a', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},
            )

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};