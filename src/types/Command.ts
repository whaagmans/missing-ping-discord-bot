import {
	ChatInputApplicationCommandData,
	Client,
	CommandInteraction,
	Message,
} from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
	run: (client: Client, interaction: CommandInteraction) => void;
}
