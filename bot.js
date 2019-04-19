const discord = require("discord.js-commando");
const db = require("./db");
const request = require("request");

let bot = new discord.CommandoClient({
    commandPrefix: "!",
    disableEveryone: false,
    fetchAllMembers: true,
    invite: "https://discord.gg/vWJdear",
    owner: "478715467947835392",
    unknownCommandResponse: true
});

global.queue = {};

bot.registry.registerGroups([
    ["misc", "Miscellaneous"],
    ["mod", "Moderation"],
    ["util", "Utilities"],
    ["commands", "Commands"],
    ["faq", "FAQ"],
    ["music", "Music"],
    ["owner", "Owner"]
])
    .registerDefaultTypes()
    .registerDefaultCommands({ ping: false, eval_: false })
    .registerDefaultGroups()
    .registerCommandsIn(`${__dirname}/commands`);

bot.token = process.env.token;
bot.login(bot.token);

bot.on("ready", () => {
    console.log("Ready.");
    bot.user.setActivity("Für Elise");
});

bot.colour = 0x6b5d5d;
bot.faq = new db("faq");
bot.warns = new db("warns");
bot.characterlist = "abcdefghijklmnopqrstuvwxyz0123456789";
bot.youtubeKey = "AIzaSyBNgVxQVPzZwJJNUf8awo3VWKfCUd_sK3M";
bot.queue = new Map();

bot.character = () => {
    return bot.characterlist.charAt(Math.round(Math.random() * bot.characterlist.length));
};
bot.characters = (length) => {
    let key = "";
    for (let i = 0; i < length; i++) key += bot.character();
    return key;
};
bot.key = () => {
    return bot.characters(16);
};
bot.hasRole = (member, name) => {
    if (member.roles.some(role => role.name == name)) return true;
    return false;
};

setInterval(() => {
    request("https://bodb.glitch.me/");
}, 10000);
