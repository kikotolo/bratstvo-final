const ms = require('ms');

module.exports = {
    name: "mute",
    category: "moderation",
    permissions: ["MODERATE_MEMBERS"],
    ownerOnly: false,
    usage: "mute [@member] [duration] [reason]",
    examples: ["mute @kikotolo 5 minutos razão", "mute @kikotolo 2h razão"],
    description: "Da Mute num membro com uma razão",
    async run(client, message, args) {
        if (!args[0]) return message.reply('Especifica um membro a levar mute');
        if (!args[1] || !args[2]) return message.reply('Define a duração do mute');
        if (!args[3]) return message.reply('Descreve o motivo de levar mute');

        const target = message.mentions.members.find(m => m.id);
        const duration = args.slice(1, 3).join(' ');
        const convertedTime = ms(duration);
        const reason = args.slice(3).join(' ');

        if (!target.moderatable) return message.reply('Este membro não pode levar mute do bot');
        if (!convertedTime) return message.reply('Indica uma duração válida')

        target.timeout(convertedTime, reason);
        message.channel.send(`O membro ${target} levou mute durante ${duration} por ${reason}!`);
    },
    options: [
      {
        name: "target",
        description: "Membro a levar mute",
        type: "USER",
        required: true,
      },
      {
        name: "duration",
        description: "Duração do mute",
        type: "STRING",
        required: true,
      },
      {
        name: "reason",
        description: "A razão do mute",
        type: "STRING",
        required: true,
      },
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember("target");
        const duration = interaction.options.getString("duration");
        const convertedTime = ms(duration);
        const reason = interaction.options.getString("reason");
     
        if (!target.moderatable) return interaction.reply('Este membro não pode levar mute do bot');
        if (!convertedTime) return interaction.reply('Indica uma duração válida')

        target.timeout(convertedTime, reason);
        interaction.reply(`O membro ${target} levou mute durante ${duration} por ${reason}!`);
    }
};