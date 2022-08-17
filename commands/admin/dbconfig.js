module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'dbconfig [key] <value>',
    examples: ['dbconfig', 'dbconfig prefix ?, dbconfig prefix'],
    description: 'Configurar os dados da Base de dados',
    async run(client, message, args, guildSettings) {
       if (!args[0] || !args[0].match(/^(prefix|logChannel|testChannel)$/)) 
            return message.reply('Utiliza uma chaves valida (`prefix`/`logChannel`/`testChannel`)'); 
        const value = args[1];

        if (args[0] == 'prefix') {
            if (value) {
                await client.updateGuild(message.guild, { prefix: value });
                return message.reply({ content: `novo valor do prefix: ${value}` });
            }
            
            message.reply({ content: `valor do prefix: ${guildSettings.prefix}` });
        } else if (args[0] == 'logChannel') {
            if (value) {
                await client.updateGuild(message.guild, { logChannel: value });
                return message.reply({ content: `novo valor do logChannel: ${value}` });
            }
             
            message.reply({ content: `valor do testChannel: ${guildSettings.testChannel}` });
        } else if (args[0] == 'testChannel') {
            if (value) {
                await client.updateGuild(message.guild, { testChannel: value });
                return message.reply({ content: `novo valor do testChannel: ${value}` });
            }
             
            message.reply({ content: `valor do testChannel: ${guildSettings.testChannel}` });
        }
    },
    options: [
        {
            name: 'key',
            description: 'Escolher uma chaves a modificar ou a mostrar',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'prefix',
                    value: 'prefix',
                },
                {
                    name: 'logChannel',
                    value: 'logChannel',
                },
                {
                    name: 'testChannel',
                    value: 'testChannel',
                }
            ]
        },
        {
            name: 'value',
            description: 'Escolher o valor para a nova chaves',
            type: 'STRING',
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');

       if (key == 'prefix') {
            if (value) {
                await client.updateGuild(interaction.guild, { prefix: value });
                return interaction.reply({ content: `novo valor do prefix: ${value}` });
            }
            
            interaction.reply({ content: `valor do prefix: ${guildSettings.prefix}` });
        } else if (key == 'logChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { logChannel: value });
                return interaction.reply({ content: `novo valor do logChannel: ${value}` });
            }
             
            interaction.reply({ content: `valor do logChannel: ${guildSettings.logChannel}` });
        } else if (key == 'testChannel') {
            if (value) {
                await client.updateGuild(interaction.guild, { testChannel: value });
                return interaction.reply({ content: `novo valor do testChannel: ${value}` });
            }
             
            interaction.reply({ content: `valor do testChannel: ${guildSettings.testChannel}` });
        }
    }
}