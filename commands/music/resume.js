const discord = require("discord.js-commando");
let queue;

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "resume",
            aliases: ["unpause", "continue"],
            group: "music",
            memberName: "resume",
            description: "Resume the current audio.",
            examples: ["resume"]
        });
        this.bot = bot;
    };

    async run(message) {
        queue = this.bot.queue;
        const currentQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) return message.channel.send("**Sorry, you're not in a voice channel, so I can't resume the music.**");
        if (message.guild.me.voiceChannel && message.guild.me.voiceChannelID !== voiceChannel.id) return message.channel.send("**Sorry, I'm in use elsewhere, so I can't resume the music.**");
        if (!currentQueue) return message.channel.send("**I'm not currently being used in this guild.**");
        try {
            currentQueue.dispatcher.resume();
            message.channel.send(`**Resumed \`${currentQueue.queue[0].name}\`.**`);
        } catch (error) {
            console.log(error)
        }
    };
};