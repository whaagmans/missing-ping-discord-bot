import { Client, Interaction, CommandInteraction } from 'discord.js';
import { Commands } from '../Commands';

const interactionCreate = (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenuCommand()) {
			await handleSlashCommand(client, interaction);
		}
	});
};

const handleSlashCommand = async (
	client: Client,
	interaction: CommandInteraction
): Promise<void> => {
	const slashCommand = Commands.find((c) => c.name === interaction.commandName);
	if (!slashCommand) {
		interaction.followUp({ content: 'an error has occurred' });
		return;
	}

	await interaction.deferReply();

	slashCommand.run(client, interaction);
};

export default interactionCreate;
