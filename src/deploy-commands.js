import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];

const foldersPath = path.join(import.meta.dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(pathToFileURL(filePath).href);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }//End of if else statement
  }//End of inner loop
}//End of outer loop

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.log(error);
  }
})();


