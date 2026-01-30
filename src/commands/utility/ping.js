import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with PALDO!'),
    async execute(interaction){
        await interaction.reply('PALDO!');
    },
};