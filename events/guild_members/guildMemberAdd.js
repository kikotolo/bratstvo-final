const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        const fetchGuild = await client.getGuild(member.guild);
        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL({ dynamic: true}) })
            .setColor('#10ff00')
            .setDescription(`► Nome: ${member}
            ► Conta criada a: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ► Juntou-se aos MAFIOSOS a: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: 'kiko BRATSTVO developer' });

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({ embeds: [embed] });
    },
};