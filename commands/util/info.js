const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "info",
            aliases: ["botinfo", "information", "botinformation"],
            group: "util",
            memberName: "info",
            description: "Get information about the bot.",
            examples: ["info"]
        });
        this.bot = bot;
    };

    async run(message) {
        const ping = await message.channel.send("Gathering information...");
        ping.edit(new RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(this.bot.colour)
            .setDescription(`**Ping:** \`${this.bot.ping}ms\`\n**Bot -> Server ping:** \`${ping.createdAt - message.createdAt}ms\`\n**Ready at:** \`${this.bot.readyAt}\`\n**Members:** \`${this.bot.guilds.find(guild => guild.id == "543034611068829706").members.size}\`\n\n**I am made by <@478715467947835392>.**`)
            .setTimestamp());
    };
};