const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
let queue;

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "queue",
            aliases: ["q", "viewq", "viewqueue"],
            group: "music",
            memberName: "queue",
            description: "View the current queue.",
            examples: ["queue"]
        });
        this.bot = bot;
    };

    async run(message, args) {
        queue = this.bot.queue;
        const currentQueue = queue.get(message.guild.id);

        if (!queue.get(message.guild.id)) return message.channel.send("**There is nothing in the queue at the moment.**");
        message.channel.send(new RichEmbed()
            .setTitle("**Queue:**")
            .setDescription(currentQueue.queue.map(track => `**${currentQueue.queue.indexOf(track) + 1}.** *[${track.name}](${track.url})*`).join("\n"))
            .setColor(0x36393E)
        );
    };
};