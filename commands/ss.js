const { MessageAttachment } = require('discord.js');
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
        const pingAudio = createAudioResource("ping_missing.mp3")
        const player = createAudioPlayer();

        voiceChannelConnection.subscribe(player);

        player.play(pingAudio);
        let attachment = new MessageAttachment('https://i.redd.it/3c3773yh88081.png')
        interaction.reply({ files: [attachment]});

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop();
            voiceChannelConnection.destroy();

        })

        interaction.deleteReply();
    },
};