// IMPORTACAO DA BIBLIOTECA, CRIACAO DOS COMANDOS
const {SlashCommandBuilder} = require('discord.js');

// OUTROS AQRUIVOS PODEM IMPORTAR
module.exports = {
    // CRIACAO DO COMANDO
    data: new SlashCommandBuilder().setName('user').setDescription('Fornece informações sobre o usuário.'),
    // FUNCAO - EXECUTA O COMANDO
    async execute(interaction) {
        // RESPOSTA
        await interaction.reply(
            `Este comando foi executado por ${interaction.user.username}, que se juntou ${interaction.member.joinedAt.toLocaleDateString()}.`
        );
    },
};