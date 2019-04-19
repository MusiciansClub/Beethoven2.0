const discord = require("discord.js-commando");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "lock",
            aliases: [],
            group: "mod",
            memberName: "lock",
            description: "lock the mentioned channel.",
            examples: ["lock #general"],
            args: [
                {
                    key: "chanel",
                    prompt: "Please enter the channel / channel ID.",
                    type: "string"
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**Unauthorised.**");

        const channel = message.mentions.channels ? message.mentions.channels.first() : message.guild.channels.find(channel => channel.id == args.channel.id);

        channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        });

        channel.send("**Locked.**");
    };
};
