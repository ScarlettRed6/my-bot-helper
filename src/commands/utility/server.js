import { SlashCommandBuilder } from "discord.js";

export default {
  cooldown: 10,
  data: new SlashCommandBuilder().setName('server').setDescription('Gives general information about the server.'),
  async execute(interaction) {
    await interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
    );
  },
};
