import { Command } from '@/types/Command';
import {
	ApplicationCommandType,
	Client,
	CommandInteraction,
	AttachmentBuilder,
} from 'discord.js';
import {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
} from '@discordjs/voice';
import { join } from 'path';

const SoundPing: Command = {
	name: 'ss',
	description: `ss pings the voice channel you're in.`,
	type: ApplicationCommandType.ChatInput,
	run: async (client: Client, interaction: CommandInteraction) => {
		if (!interaction.guildId || !interaction.member) {
			await interaction.followUp('Something went wrong!');
			return;
		}
		const guild = interaction.client.guilds.cache.get(interaction.guildId);
		const member = guild?.members.cache.get(interaction.member.user.id);
		const voiceChannel = member?.voice.channel;
		if (!voiceChannel) {
			await interaction.followUp('Join a voice channel first!');
			return;
		}
		const voiceChannelConnection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			selfDeaf: false,
		});
		const pingAudio = createAudioResource(
			join(__dirname, '../assets/ping_missing.mp3')
		);
		console.log(pingAudio.playbackDuration);
		const player = createAudioPlayer();

		voiceChannelConnection.subscribe(player);
		player.play(pingAudio);

		const attachment = new AttachmentBuilder(
			'https://i.redd.it/3c3773yh88081.png'
		);
		await interaction.followUp({ files: [attachment] });

		player.on(AudioPlayerStatus.Idle, () => {
			player.stop();
			voiceChannelConnection.destroy();
		});

		await interaction.deleteReply();
	},
};

export default SoundPing;
