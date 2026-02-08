import { SlashCommandBuilder } from "discord.js";

export default {
    cooldown: 2,
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with PALDO!'),
    async execute(interaction){
        await interaction.reply('PALDO!');
    },
};