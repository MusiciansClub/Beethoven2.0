const discord = require("discord.js-commando");
const ms = require("ms");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "mute",
            aliases: ["mute", "hush", "quiet"],
            group: "mod",
            memberName: "mute",
            description: "Mute the mentioned member.",
            examples: ["mute @Puggie1987 24h"],
            args: [
                {
                    key: "user",
                    prompt: "Please enter the user / user ID.",
                    type: "string"
                },
                {
                    key: "time",
                    type: "string",
                    prompt: "Please enter the time."
                },
                {
                    key: "reason",
                    type: "string",
                    prompt: "Please enter the reason."
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Unauthorised.**");

        const time = ms(args.time);
        const user = message.mentions.members ? message.mentions.members.first() : message.guild.member(args.user);

        const muteRole = message.guild.roles.find(role => role.name == "Rest");

        user.addRole(muteRole);

        message.channel.send(`**Muted ${user} for \`${args.time}\` for \`${args.reason}\`.**`);

        user.send(`**You were muted in \`${message.guild.name}\` for \`${args.time}\` for \`${args.reason}\`.**`)

        setTimeout(() => {
            user.removeRole(muteRole);
            message.channel.send(`**Unmuted ${user}.**`);
            user.send(`**You were unmuted in \`${message.guild.name}\`.**`)
        }, ms(args.time));
    };
};