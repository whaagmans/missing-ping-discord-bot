import { ActivityType, Client } from 'discord.js';
import { Commands } from '../Commands';

const ready = (client: Client): void => {
	client.on('ready', async () => {
		if (!client.user || !client.application) {
			return;
		}
		// Retrieve slash commands for the bot
		await client.application.commands.set(Commands);

		// Set Bot activity/presence
		client.user.setPresence({
			activities: [
				{ name: 'to blast ping sounds', type: ActivityType.Watching },
			],
		});
		console.log(`${client.user.username} is online`);
	});
};

export default ready;
