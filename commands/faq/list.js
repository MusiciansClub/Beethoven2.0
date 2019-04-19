const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "faq",
            aliases: ["faqlist", "listfaq", "faqs", "listfaqs"],
            group: "faq",
            memberName: "faq",
            description: "Get a list of the frequently asked questions.",
            examples: ["faq"]
        })
        this.bot = bot;
    };

    async run(message) {
        const faqs = this.bot.faq.getAll();
        message.channel.send(new RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(this.bot.colour)
            .setDescription(faqs.map(faq => `**${faqs.indexOf(faq) + 1}.** \`${faq.question}\`\n\`${faq.answer}\``).join("\n"))
            .setTimestamp());
    };
};