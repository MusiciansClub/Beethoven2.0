const discord = require("discord.js-commando");
const ms = require("ms");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "unban",
            aliases: ["pardon", "invite"],
            group: "mod",
            memberName: "unban",
            description: "unban the mentioned user.",
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
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Unauthorised.**");

        const user = args.user;

        message.guild.unban(user, args.reason).catch(error => {
            message.channel.send(`**I'm sorry, but I couldn't unban ${user}.**`);
        });

        message.channel.send(`**I have unbanned <@${user}> for \`${args.reason}\`**`);
    };
};