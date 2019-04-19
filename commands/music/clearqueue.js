const discord = require("discord.js-commando");
let queue;

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "clearqueue",
            aliases: ["clearq", "clrq", "clrqueue"],
            group: "music",
            memberName: "clearqueue",
            description: "Clear the current queue.",
            examples: ["clearqueue"]
        });
        this.bot = bot;
    };

    async run(message, args) {
        queue = this.bot.queue;
        const currentQueue = queue.get(message.guild.id);

        if (!message.member.roles.some(role => ["𝑴𝒐𝒅𝒆𝒓𝒂𝒕𝒐𝒓 𝑷𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏", "𝑨𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒕𝒐𝒓 𝑷𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏"].includes(role.name))) return message.channel.send("**Sorry, but you're not allowed to use this command.**");
        if (!currentQueue) return message.channel.send("**There is nothing in the queue at the moment.**");
        queue.set(message.guild.id, false);
        message.channel.send("**Queue cleared.**");
    };
};