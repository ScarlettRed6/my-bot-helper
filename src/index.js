import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

//Setup for command file path, this helps construct the file path 
const foldersPath = path.join(import.meta.dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

//The loop is for loading command files
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    //const command = require(filePath);
    const { default: command } = await import(pathToFileURL(filePath).href);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);

    }//End of ifelse statement
  }//End of inner loop
}//End of outer loop

//Get file path, filter files for events
const eventsPath = path.join(import.meta.dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles){
  const filePath = path.join(eventsPath, file);
  const { default: event } = await import(pathToFileURL(filePath).href);
  if (event.once){
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}//End of loop for event file handling

client.login(token);
