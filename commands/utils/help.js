const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');

const contextDescription = {
    userinfo: 'Envia as informações do utilisador'
}

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'help',
    examples: ['help','help ping', 'help poll'],
    description: 'Mostra uma lista de comando filtrados por categoria',
    async run(client, message, args, guildSettings) {
        const prefix = guildSettings.prefix;
        if (!args.length) {
            const noArgsEmbed = new MessageEmbed()
                .setColor('#009fff')
                .addField('Lista dos Comandos', `Uma lista de todas as categorias e os seus comandos.\nPara mais informações sobre um comando, usa \`${prefix}help <command>\``)
            
            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `╔ ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return message.channel.send({ embeds: [noArgsEmbed] });
        }

        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply('Este comando não existe!');

        return message.channel.send(`
\`\`\`makefile
[Help: Comando -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Para os admins unicamente /!\\' : ''}
        
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisação: ${prefix}${cmd.usage}
Exemplo: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissão: ${cmd.permissions.join(', ')}

---

${prefix} = prefixo utilisado para o bot (comandos com / tambem estão desponiveis)
{} = comando secundario disponivel \n[] = opções obrigatorias \n<> = opções não obrigatorias
Por favor não incluir os caracters especiais -> {}, [] e <> \nnos vossos comandos.
\`\`\``);
    },
    options: [
        {
            name: 'command',
            description: 'Escolhe o nome do comando',
            type: 'STRING',
            required: false,
        },
    ],
    async runInteraction(client, interaction, guildSettings) {
        const prefix = guildSettings.prefix;
        const cmdName = interaction.options.getString('command');

        if (!cmdName) {
            const noArgsEmbed = new MessageEmbed()
                .setColor('#009fff')
                .addField('Lista dos Comandos', `Uma lista de todas as categorias e os seus comandos.\nPara mais informações sobre um comando, usa \`${prefix}help e o comando\``)
            
            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `╔ ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({ content: 'Este comando não existe!', ephemeral: true});

        return interaction.reply({ content: `
\`\`\`makefile
[Help: Comando -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Para os admins unicamente /!\\' : ''}
        
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisação: ${prefix}${cmd.usage}
Exemplo: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissão: ${cmd.permissions.join(', ')}

---

${prefix} = prefixo utilisado para o bot (comandos com / tambem estão desponiveis)
{} = comando secundario disponivel \n[] = opções obrigatorias \n<> = opções não obrigatorias
Por favor não incluir os caracters especiais -> {}, [] e <> \nnos vossos comandos.
\`\`\``, ephemeral: true});

    },
};