import fs from 'fs';
import path from 'path';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();


client.login(token);
