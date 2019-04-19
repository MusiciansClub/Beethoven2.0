const discord = require("discord.js-commando");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "delete",
            aliases: ["delete", "purge", "clear"],
            group: "mod",
            memberName: "delete",
            description: "delete the mentioned amount of messages.",
            examples: ["delete 100"],
            args: [
                {
                    key: "amount",
                    prompt: "Please enter the amount of messages to delete.",
                    type: "integer"
                }
            ]
        });
        this.bot = bot;
    };

    async run(message, args) {
        if (!message.member.hasPermission("DELETE_MESSAGES")) return message.channel.send("**Unauthorised.**");

        if (args.amount > 100) return msg.channel.send("**I'm sorry, you cannot delete more than 100 messages at a time.**");

        message.channel.bulkDelete(args.amount);
    };
};