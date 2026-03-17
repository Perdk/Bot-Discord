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

// CAMINHO DA PASTA EVENTS
const eventsPath = path.join(__dirname, '../events');

// LÊ OS ARQUIVOS DA PASTA
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

}

// LOGIN DO BOT
client.login(token);

