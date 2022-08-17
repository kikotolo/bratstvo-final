module.exports = {
    name: "unmute",
    category: "moderation",
    permissions: ["MODERATE_MEMBERS"],
    ownerOnly: false,
    usage: "unmute [@member]",
    examples: ["unmute @kikotolo"],
    description: "Tira o Mute a um membro",
    async run(client, message, args) {
        if (!args[0]) return message.reply('Especifica o membro a tirar o mute');

        const target = message.mentions.members.find(m => m.id);
 
        if (!target.isCommunicationDisabled()) return message.reply('Este membro não pode sair do mute pelo bot pois ele não esta mute');
        
        target.timeout(null);
        message.channel.send(`O membro ${target} saiu do mute`);
    },
    options: [
      {
        name: "target",
        description: "Membro a sair do mute",
        type: "USER",
        required: true,
      },
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember("target");
        
        if (!target.isCommunicationDisabled()) return interaction.reply('Este membro não pode sair do mute pelo bot pois ele não esta mute');
        
        target.timeout(null);
        interaction.reply(`O membro ${target} saiu do mute`);
    }
};