// ARQUIVO QUE CONTROLA AS EXECUÇÕES DE COMANDO DO BOT

// IMPORTAÇÃO DA BIBLIOTECA
const {Events, MessageFlags} = require('discord.js');

// EXPORTADO PARA REUTILIZAR EM OUTROS ARQUIVOS
// OBJETO
module.exports = { 
// DEFINE QUAL EVENTO O BOT VAI ESCUTAR
	name: Events.InteractionCreate,
	
	// FUNÇÃO QUE EXECUTA A INTERAÇÃO
	async execute(interaction) {
		// SE FOR DIFERENTE DE SLASH COMAND, PARA O CODIGO
		if (!interaction.isChatInputCommand()) return;
		// COLETA O NOME DO COMANDO USADO, DENTRO DA COLEÇÃO DE COMANDOS
		const command = interaction.client.commands.get(interaction.commandName);
		// VERIFICA SE O COMANDO EXISTE
		if (!command) {
			console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
			return;
		}
		// CHAMA O COMANDO QUE ESTA DENTRO DE COMMANDS
		try {
			await command.execute(interaction);
		} // CAPTURA DE ERROS
			catch (error) {
			console.error(error);
			// VERIFICA SE O BOT RESPONDEU
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'Ocorreu um erro ao executar este comando!',
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: 'Ocorreu um erro ao executar este comando!',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
}
}