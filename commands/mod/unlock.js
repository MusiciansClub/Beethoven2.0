const discord = require("discord.js-commando");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "unlock",
            aliases: [],
            group: "mod",
            memberName: "unlock",
            description: "unlock the mentioned channel.",
            examples: ["unlock #general"],
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
            SEND_MESSAGES: true
        });

        channel.send("**Unlocked.**");
    };
};
