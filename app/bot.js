/* eslint-disable no-undef */

// IMPORTAÇÃO DA BIBLIOTECA DO DISCORD, CONECTA API DO DISCORD
// RECEBE EVENTOS, ENVIA MENSAGENS
const {Client, Events, GatewayIntentBits} = require('discord.js');
// RECEBENDO O TOKEN DO BOT
const {token} = require('./token/config.json');
// CRIAÇÃO DO BOT
// GATEWAY RECEBE EVENTOS REF. A SERVIDORES -GUILDS-SERVIDOR DO DISCORD-
const client = new Client({intents: [GatewayIntentBits.Guilds]});
// CASO O BOT FIQUE ONLINE, EXECUTE A FUNCAO
// ONCE FAZ COM QUE EXECUTE 1 VEZ
client.once(Events.ClientReady, (readyClient)=>{
    // eslint-disable-next-line no-undef
    console.log(`BOT LOGADO ${readyClient.user.tag}`);
});

// LOGIN DO BOT
client.login(token);    

// VER PRO TOKEN N APARECER DPS, SUBI NO GIT E DEIXEI PRIVADO