// IMPORTACAO DA BIBLIOTECA DISCORD.JS QUE CRIA COMANDS SLASH
const {SlashCommandBuilder} = require('discord.js');

// FAZ COM QUE OUTROS ARQUIVOS POSSAM IMPORTAR O COMANDO
module.exports = {
	// CRIANDO O COMANDO
    // SlashCommandBuilder É UM CONSTRUTOR DE COMANDO
    data: new SlashCommandBuilder().setName('ping').setDescription('Descrição'),
	// FUNCAO
    async execute(interaction) {
		// RESPOSTA NO CHAT
        // AWAIT PQ DISCORD É ASSINCRONO, BOT ENVIA REQUISICAO E DISCORD RESPONDE
        await interaction.reply('Pong!');
	},
};