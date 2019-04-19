const discord = require("discord.js-commando");
const ms = require("ms");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "ban",
            aliases: ["remove", "abolish", "expel"],
            group: "mod",
            memberName: "ban",
            description: "Ban the mentioned user.",
            examples: ["ban @Puggie1987 6h broke rules"],
            args: [
                {
                    key: "user",
                    prompt: "Please enter the user / user ID.",
                    type: "string"
                },
                {
                    key: "timeframe",
                    prompt: "Please enter the time.",
                    type: "string"
                },
                {
                    key: "reason",
                    prompt: "Please enter the reason",
                    type: "string"
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Unauthorised.**");

        const user = message.mentions.members ? message.mentions.members.first() : message.guild.member(args.user);

        user.ban(args.reason).catch(error => {
            message.channel.send(`**I'm sorry, but I couldn't ban ${user}.**`);
        });

        message.channel.send(`**I have banned ${user} for \`${args.reason}\`**`);

        setTimeout(() => {
            message.guild.unban(user);
        }, ms(args.timeframe));
    };
};