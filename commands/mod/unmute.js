const discord = require("discord.js-commando");
const ms = require("ms");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "unmute",
            aliases: [],
            group: "mod",
            memberName: "umute",
            description: "Unmute the mentioned member.",
            examples: ["unmute @Puggie1987"],
            args: [
                {
                    key: "user",
                    prompt: "Please enter the user / user ID.",
                    type: "string"
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Unauthorised.**");

        const user = message.mentions.members ? message.mentions.members.first() : message.guild.member(args.user);

        const muteRole = message.guild.roles.find(role => role.name == "Rest");

        user.removeRole(muteRole);

        user.send(`**You were unmuted in \`${message.guild.name}\`.**`)

        message.channel.send(`**Unmuted ${user}.**`);
    };
};