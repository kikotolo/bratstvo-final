const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const selectMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roles-menu')
            .setPlaceholder('Escolhe um cargo na lista')
            .setMinValues(1)
            .setMaxValues(2)
            .addOptions([
                {
                    label: 'Cidadão',
                    description: 'Se és cidadão escolhe esta opção',
                    value: '956734028604665927'
                },
                {
                    label: 'Inem',
                    description: 'Se és Inem escolhe esta opção',
                    value: '972333249336598548'
                },
              //  {
                  //  label: 'Roleplay',
                  //  description: 'test de cargo',
                  //  value: '1006821980001021952'
               // },

            ])
    )

module.exports = {
    name: 'roles',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'roles',
    examples: ['roles'],
    description: 'Lista de cargos!',
    async run(client, message, args) {
        await message.channel.send({ content: 'Escolhe os cargos que te correspondem!', components: [selectMenu] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ content: 'Escolhe os cargos que te correspondem!', components: [selectMenu] });
    },
};