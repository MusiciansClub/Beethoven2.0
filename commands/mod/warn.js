const discord = require("discord.js-commando");
const ms = require("ms");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "warn",
            aliases: [],
            group: "mod",
            memberName: "warn",
            description: "warn the mentioned user.",
            examples: ["unban @Puggie1987 he was nice :D"],
            args: [
                {
                    key: "user",
                    prompt: "Please enter the user / user ID.",
                    type: "string"
                },
                {
                    key: "reason",
                    prompt: "Please enter the reason.",
                    type: "string",
                    default: "Was pardoned."
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Unauthorised.**");

        const user = args.user;

        this.bot.warns.set({ user: user.id, reason: args.reason })
    };
};