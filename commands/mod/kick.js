const discord = require("discord.js-commando");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "kick",
            aliases: ["dispose"],
            group: "mod",
            memberName: "kick",
            description: "Kick the mentioned user.",
            examples: ["kick @Puggie1987 broke rules"],
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
                    default: "Broke the rules."
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**Unauthorised.**");

        const user = message.mentions.members ? message.mentions.members.first() : message.guild.member(args.user);

        user.kick(args.reason).catch(error => {
            message.channel.send(`**I'm sorry, but I couldn't kick ${user}.**`);
        });

        message.channel.send(`**I have kicked ${user} for \`${args.reason}\`**`);
    };
};