import { Command } from '../types/Command';
import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';

const Hello: Command = {
	name: 'hello',
	description: 'Returns a greeting',
	type: ApplicationCommandType.ChatInput,
	run: async (client: Client, interaction: CommandInteraction) => {
		const content = 'Hello world!';

		await interaction.followUp({
			ephemeral: true,
			content,
		});
	},
};

export default Hello;
