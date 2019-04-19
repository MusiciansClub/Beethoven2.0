const discord = require("discord.js-commando");
let queue;

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "volume",
            aliases: ["vol", "setvol", "setvolume"],
            group: "music",
            memberName: "volume",
            description: "Set the volume for the current audio.",
            examples: ["volume 20", "volume 300"],
            args: [{
                key: "volume",
                prompt: "Please enter the new volume.",
                type: "string"
            }]
        });
        this.bot = bot;
    };

    async run(message, args) {
        queue = this.bot.queue;
        const currentQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
        if (!message.member.roles.some(role => ["𝑴𝒐𝒅𝒆𝒓𝒂𝒕𝒐𝒓 𝑷𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏", "𝑨𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒕𝒐𝒓 𝑷𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏"].includes(role.name))) return message.channel.send("**Sorry, but you're not allowed to use this command.**");
        if (!voiceChannel) return message.channel.send("**Sorry, you're not in a voice channel, so I can't change the volume.**");
        if (message.guild.me.voiceChannel && message.guild.me.voiceChannelID !== voiceChannel.id) return message.channel.send("**Sorry, I'm in use elsewhere, so I can't change the volume.**");
        if (!currentQueue) return message.channel.send("**I'm not currently being used in this guild.**");
        try {
            currentQueue.dispatcher.setVolume(parseInt(args.volume) / 100);
            message.channel.send(`**Set the volume to \`${args.volume}\`.**`);
        } catch (error) {
            console.log(error)
        }
    };
};