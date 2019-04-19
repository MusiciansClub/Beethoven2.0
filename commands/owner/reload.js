const discord = require("discord.js-commando");

module.exports = class extends discord.Command {
    constructor(bot) {
        super(bot, {
            name: "restart",
            aliases: ["refresh"],
            group: "owner",
            memberName: "restart",
            description: "Restart the bot.",
            examples: ["restart"],
            ownerOnly: true
        });
        this.bot = bot;
    };

    async run(message) {
        const voiceConnection = message.guild.me.voiceConnection;
        if (voiceConnection) voiceConnection.leave();
        const token = this.bot.token;
        await this.bot.destroy();
        await this.bot.login(token);
        message.channel.send("**Restarted.**");
    };
};