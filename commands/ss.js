const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const wait = require('node:timers/promises').setTimeout();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ss')
        .setDescription('Missing ping!'),
        
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) await interaction.reply("Join a voice channel first!")

        const voiceChannelConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });
        const pingAudio = createAudioResource("../ping_missing.mp3")
        const player = createAudioPlayer();

        voiceChannelConnection.subscribe(player);

        player.play(pingAudio);

        interaction.reply("MISSING!");

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop();
            voiceChannelConnection.destroy();

        })

        interaction.deleteReply();
    },
};