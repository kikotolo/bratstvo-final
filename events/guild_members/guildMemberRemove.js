const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(client, member) {
        const fetchGuild = await client.getGuild(member.guild);
        const fetchKicklog = await member.guild.fetchAuditLogs({
            limite: 1,
            type: "MEMBER_KICK"
        });

        const kickLog = fetchKicklog.entries.first();
        const { target, reason } = kickLog;
        let isMemberKick = false;

        if (target.id === member.id) isMemberKick = true;

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.   displayAvatarURL({ dynamic: true}) })
            .setColor('#ff0000')
            .setDescription(`► Nome: ${member.displayName}
            ► Conta criada a: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt (member.user.createdTimestamp / 1000)}:R>)
            ► Juntou-se aos MAFIOSOS a: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt (member.joinedTimestamp / 1000)}:R>)
            ► Saiu da familia a: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
            ► Ban/kick?: ${isMemberKick ? `🟢 (razão: ${reason})` : '🔴'}
            `)
            .setTimestamp()
            .setFooter({ text: 'kiko BRATSTVO developer' });

            const logChannel = client.channels.cache.get(fetchGuild.logChannel);
            logChannel.send({ embeds: [embed] 
        });
    },  
};
