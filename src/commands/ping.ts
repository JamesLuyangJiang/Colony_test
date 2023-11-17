import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping2")
  .setDescription("Replies with Pong!");

async function execute(interaction) {
  await interaction.reply("Pong!");
}

export { data, execute };
