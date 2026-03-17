// IMPORTAÇÃO DA BIBLIOTECA
const {Events} = require('discord.js');

// EXPORTADO PARA REUTILIZAR EM OUTROS ARQUIVOS
// OBJETO
module.exports = {
    name: Events.ClientReady,
    // EXECUTA APENAS 1 VEZ
    once: true,
    // EXECUTA O BOT
    execute(client) {
        console.log(`BOT LOGADO ${client.user.tag}`);
    },
};