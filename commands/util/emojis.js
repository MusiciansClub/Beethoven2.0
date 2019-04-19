const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const request = require("request");

module.exports = class extends discord.Command {
        constructor(bot) {
            super(bot, {
                name: "emojis",
                aliases: ["emotes", "emojilist", "emotelist"],
                group: "util",
                memberName: "emojis",
                description: "Get a list of all the emojis in the server.",
                examples: ["emojis"]
            })
            this.bot = bot;
        };

        async run(message) {
                const emojiUrls = [];
                const emojiNames = [];
                message.guild.emojis.forEach(async emoji => {
                    request(`https://bodb.glitch.me/?url=${emoji.url}`, async(error, response, body) => {
                        body = JSON.parse(body);
                        emojiUrls.push(body.key);
                        emojiNames.push(emoji.name);
                    });
                });
                setTimeout(() => {
                            message.channel.send(new RichEmbed()
                                    .setAuthor(message.author.username, message.author.avatarURL)
                                    .setColor(this.bot.colour)
                                    .setDescription(`** Amount:** \`${message.guild.emojis.size}\`\n**List:** *${message.guild.emojis.map(emoji => `[${emoji.name}](http://bodb.glitch.me/?key=${emojiUrls[emojiNames.indexOf(emoji.name)]})`).join(", ")}*`)
                .setTimestamp());
        }, 750);
    };
};