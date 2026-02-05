import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

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

client.login(token);
