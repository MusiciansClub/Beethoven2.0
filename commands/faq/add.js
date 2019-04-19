const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const trigger = ":::";

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "addfaq",
            aliases: ["faqadd", "newfaq"],
            group: "faq",
            memberName: "addfaq",
            description: "Add to the list of frequently asked questions.",
            examples: ["faqadd question:::answer"],
            args: [
                {
                    "key": "text",
                    "validate": (text) => {
                        if (!text.includes(trigger) || text.endsWith(trigger) || text.startsWith(trigger)) return false;
                        return true;
                    },
                    "prompt": "Please provide the question & answer.",
                    "type": "string"
                }
            ]
        })
        this.bot = bot;
    };

    async run(message, args) {
        if (!this.bot.hasRole(message.member, "𝑺𝒖𝒑𝒑𝒐𝒓𝒕")) return;
        const text = args.text.split(trigger);
        const newFaq = {
            question: text[0],
            answer: text[1]
        };
        this.bot.faq.set(newFaq);
        message.channel.send(new RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(this.bot.colour)
            .setDescription(`**Added new FAQ item.**`)
            .setTimestamp());
    };
};