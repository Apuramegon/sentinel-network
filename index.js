// Variáveis
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const bot = new Discord.Client();
const guild = new Discord.Client();
const prefix = '!'

// Pasta Events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:
 
  // Pasta Commands
  const moment = require('moment')
  moment.locale('pt-br');
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.log(err)
}
})

// Jogando...
client.on('ready', () => {
  client.user.setPresence({ game: { name: `no Sentinel Network`, type: 1}});
  console.log('Iniciando..');
  console.log('3..');
  console.log('2..');
  console.log('1..');
  console.log(`Funcionando!! Logado como ${client.user.tag}!
  Servers: ${client.guilds.size}
  Usuários: ${client.users.size}
  Canais: ${client.channels.size}`);
});

// Bot Token
client.login('SECRET_TOKEN');
