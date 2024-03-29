import { 
    SlashCommandBuilder
  } from "discord.js";
  
  import {
    unsubscribeToGitHub
  } from "../../util/github.js"
  
  // TODO: Need to include event type option for unsubscribing
  const data = new SlashCommandBuilder()
    .setName("gitdisconnect")
    .setDescription("Disconnect to the github repository via link")
    .addStringOption(option =>
      option.setName('repolink')
          .setDescription('The link to the GitHub repository')
          .setRequired(true));
  
  async function execute(interaction) {
    // Get the repository link from the interaction
    const repoLink = interaction.options.getString('repolink');
  
    // Validate the link
    if (!repoLink || !isValidGitHubLink(repoLink)) {
        await interaction.reply({ content: 'Please provide a valid GitHub repository link.', ephemeral: true });
        return;
    }

    const channelId = interaction.channelId;
  
    // Call the helper to set up the notifications with the github app
    const result = await unsubscribeToGitHub(repoLink, channelId);
  
    if (result === -1) {
      await interaction.reply({
        content:
            "You are not a subscriber of this repository!",
      });
    } else {
      await interaction.reply({
        content:
            "You have unsubscribed to this repository!",
      });
    }
  }
  
  // Function to validate the GitHub repository link
  function isValidGitHubLink(link: string): boolean {
    const githubUrl = 'https://github.com/';
    return (link.startsWith(githubUrl) && link.length > githubUrl.length);
  }
  
  export { data, execute };