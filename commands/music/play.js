const discord = require("discord.js-commando");
const ytdl = require("ytdl-core");
const search = require("youtube-search");
let queue;

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "play",
            aliases: ["play", "music", "song"],
            group: "music",
            memberName: "play",
            description: "Play the audio of a video off youtube.",
            examples: ["play 1H EDM Mix", "play Ali-A Intro Earrape"],
            args: [{
                key: "name",
                prompt: "Please enter the name of the video.",
                type: "string"
            }]
        });
        this.bot = bot;
    };

    async run(message, args) {
        queue = this.bot.queue;
        const voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) return message.channel.send("**Sorry, you're not in a voice channel, so I can't join.**");
        if (message.guild.me.voiceChannel && message.guild.me.voiceChannelID !== voiceChannel.id) return message.channel.send("**Sorry, I'm in use elsewhere, so I can't join.**");
        if (!voiceChannel.joinable) return message.channel.send("**Sorry, I don't have sufficient permissions to join the channel you're in.**");

        try {
            const searchResults = await search(args.name, {
                maxResults: 1,
                key: this.bot.youtubeKey,
            });

            const info = searchResults.results[0];

            let data = queue.get(message.guild.id) || {};

            if (!data.connection) data.connection = await voiceChannel.join();
            if (!data.queue) data.queue = [];
            data.guildId = message.guild.id;

            data.queue.push({
                name: info.title,
                requester: message.member,
                url: info.link,
                channel: message.channel
            });

            if (!data.dispatcher) {
                play(this.bot, data)
            } else {
                message.channel.send(`\`${info.title}\` **added to queue.**`);
            };

        } catch (error) {
            message.channel.send("**Invalid search query / URL.**");
        };
        this.bot.queue = queue;
    };
};

async function play(bot, data) {
    data.queue[0].channel.send(`**Now playing \`${data.queue[0].name}\`.**`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url), {
        filter: "audioonly"
    });

    queue.set(data.guildId, data);

    data.dispatcher.once("end", () => {
        finish(bot, data);
    });
};

function finish(bot, data) {
    data.queue.shift();
    if (data.queue.length > 0) {
        queue.set(data.guildId, data);
        play(bot, data);
    } else {
        bot.guilds.get(data.guildId).me.voiceChannel.leave();
        try {
            data.queue[0].channel.send(`**The queue is now empty, left voice channel.**`);
        } catch (error) {

        };
        queue.delete(data.guildId);
    }
}