const discord = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "serverinfo",
            aliases: ["servinfo", "server", "serverinformation"],
            group: "util",
            memberName: "serverinfo",
            description: "Get information about the server.",
            examples: ["serverinfo"]
        })
        this.bot = bot;
    };

    async run(message) {
        const onlineMembers = message.guild.members.filter(member => member.presence.status == "online");
        message.channel.send(new RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(this.bot.colour)
            .setDescription(`**Members:**\n*Online:* \`${onlineMembers.filter(member => !member.user.bot).size} users, ${onlineMembers.filter(member => !member.user.bot).size} bots\`\n*Idle:* \`${message.guild.members.filter(member => member.presence.status == "idle").size}\`\n*DND:* \`${message.guild.members.filter(member => member.presence.status == "dnd").size}\`\n*Offline:* \`${message.guild.members.filter(member => member.presence.status == "invisible").size}\`\n*Bots:* \`${message.guild.members.filter(member => member.user.bot == true).size}\``)
            .setTimestamp());
    };
};