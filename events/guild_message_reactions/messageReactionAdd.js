module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(client, messageReaction, user) {
         // 🟥🟩🟦
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

        if (emojiName === '🟥') message.delete();
        if (emojiName === '🟦') message.reactions.removeAll();
      //  if (emojiName === '🟩') message.channel.send('quadrado verde');
        if (emojiName === '🟩') member.send('Olá tudo bem?');
    }
};