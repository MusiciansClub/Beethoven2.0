const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const trigger = ":::";

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "delfaq",
            aliases: ["faqdel", "remfaq", "removefaq"],
            group: "faq",
            memberName: "delfaq",
            description: "Add to the list of frequently asked questions.",
            examples: ["faqadd question:::answer"],
            args: [
                {
                    "key": "number",
                    "prompt": "Please provide the number of the frequently asked question.",
                    "type": "string",
                }
            ]
        })
        this.bot = bot;
    };

    async run(message, args) {
        if (!this.bot.hasRole(message.member, "𝑺𝒖𝒑𝒑𝒐𝒓𝒕")) return;
        this.bot.faq.del(parseInt(args.number) - 1);
        message.channel.send(new RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(this.bot.colour)
            .setDescription(`**Removed FAQ item.**`)
            .setTimestamp());
    };
};