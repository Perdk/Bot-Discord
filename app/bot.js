/* eslint-disable no-undef */

// IMPORTAÇÃO DA BIBLIOTECA DO DISCORD, CONECTA API DO DISCORD
// RECEBE EVENTOS, ENVIA MENSAGENS
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');

// LER COMMANDS E IDENTIFICAR DIRETORIO
const fs = require('node:fs');
// CRIA CAMINHOS PARA ACESSAR ARQUIVOS
const path = require('node:path');
// RECEBENDO O TOKEN DO BOT
const {token} = require('./token/config.json')
// CRIAÇÃO DO BOT
// GATEWAY RECEBE EVENTOS REF. A SERVIDORES -GUILDS-SERVIDOR DO DISCORD-
const client = new Client({intents: [GatewayIntentBits.Guilds]});
// CASO O BOT FIQUE ONLINE, EXECUTE A FUNCAO
// ONCE FAZ COM QUE EXECUTE 1 VEZ
client.once(Events.ClientReady, (readyClient)=>{
    // eslint-disable-next-line no-undef
    console.log(`BOT LOGADO ${readyClient.user.tag}`);
});
  
// CRIA UM LOCAL PRA GUARDA COMANDOS
client.commands = new Collection(); 

// ACESSA A PASTA DE COMANDOS
const foldersPath = path.join(__dirname, '../commands');

// LE O CAMINHO DO DIRETORIO E RETORNA ARRAY COM NOME DAS PASTAS
const commandFolders = fs.readdirSync(foldersPath);

// ACESSA CADA PASTA
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	
	// FILTRA APENAS ARQUIVOS JS
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		
		// IMPORTA O ARQUIVO
		const command = require(filePath);
		
		// VERIFICA SE O COMANDO ESTA OK
		if ('data' in command && 'execute' in command) {
		// SALVA O COMANDO NO BOT
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[AVISO] O comando em ${filePath} está sem uma obrigatória "data" or "execute" property.`);
		}
	}
}

// QUANDO HÁ INTERAÇÃO COM O BOT, É EXECUTADO ESSA FUNÇÃO
client.on(Events.InteractionCreate, async (interaction) => {

	// CASO NAO SEJA UM COMANDO SLASH, ELE PARA
	if (!interaction.isChatInputCommand()) return;
    // client.commands.get - PROCURA NO ARMAZENAMENTO
    // interaction.commandName - RECEBE O NOME DO COMANDO USADO
	const command = client.commands.get(interaction.commandName);

	// VERIFICA SE O COMANDO EXISTE
	if (!command) return;

	// TENTA EXECUTAR O COMANDO
	try {
		// EXECUTA O COMANDO
		await command.execute(interaction);
		// CAPURA ERRO
	} catch (error) {

		console.error(error);

	}

});

// LOGIN DO BOT
client.login(token);

