const discord = require("discord.js-commando");
const ytdl = require("ytdl-core");
let queue;

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "skip",
            aliases: ["next"],
            group: "music",
            memberName: "skip",
            description: "Skip the current audio.",
            examples: ["skip"]
        });
        this.bot = bot;
    };

    async run(message) {
        queue = this.bot.queue;
        const currentQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;

        if (!message.member.roles.some(role => ["𝑴𝒐𝒅𝒆𝒓𝒂𝒕𝒐𝒓 𝑷𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏", "𝑨𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒕𝒐𝒓 𝑷𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏"].includes(role.name))) return message.channel.send("**Sorry, but you're not allowed to use this command.**");
        if (!voiceChannel) return message.channel.send("**Sorry, you're not in a voice channel, so I can't join.**");
        if (message.guild.me.voiceChannel && message.guild.me.voiceChannelID !== voiceChannel.id) return message.channel.send("**Sorry, I'm in use elsewhere, so I can't join.**");
        if (!currentQueue) return message.channel.send("**I'm not currently being used in this guild.**");

        try {
            if (currentQueue.queue.length > 1) {
                message.channel.send(`\`${currentQueue.queue[0].name}\` **skipped. Now playing \`${currentQueue.queue[1].name}\`**`);
                currentQueue.queue.shift();
                play(bot, currentQueue);
            } else {
                message.channel.send(`\`${currentQueue.queue[0].name}\` **skipped. No more tracks, leaving voice channel.**`);
                currentQueue.queue.shift();
                message.guild.me.voiceChannel.leave();
            };
        } catch (error) {
            console.log(error)
        }
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
        data.queue[0].channel.send(`**The queue is now empty, left voice channel.**`);
        queue.delete(data.guildId);
    };
};