module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(client, messageReaction, user) {
         // ๐ฅ๐ฉ๐ฆ
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id);
        if (member.user.bot) return;

        if (messageReaction.partials) {
            try {
                await messageReaction.fetch()
            } catch (error) {
                console.log('Impossivel de recuperar as mensagens');
                return;
            }
        }

        if (emojiName === '๐ฅ') message.delete();
        if (emojiName === '๐ฆ') message.reactions.removeAll();
      //  if (emojiName === '๐ฉ') message.channel.send('quadrado verde');
        if (emojiName === '๐ฉ') member.send('Olรก tudo bem?');
    }
};