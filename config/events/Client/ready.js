const {
  Client,
  Intents,
  Collection,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Permissions,
  MessageButton,
  GuildMemberManager,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});
let config = require("../../../config.json");
let ReadyLogChannelId = config.Logs.ReadyLogChannelID;
const clc = require("cli-color");
const stringlength = 69;
let Emoji_Online = process.env.Emoji_Online;
module.exports = {
  name: "ready",
  async execute(client) {
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    let readylogchannel = client.channels.cache.get(ReadyLogChannelId);
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    client.user.setStatus("dnd");
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    console.log(
      clc.cyanBright(
        `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
      )
    );
    console.log(
      clc.cyanBright(`     ┃ `) +
        " ".repeat(-1 + stringlength - ` ┃ `.length) +
        clc.cyanBright("┃")
    );
    console.log(
      clc.cyanBright(`     ┃ `) +
        clc.whiteBright.bold(
          `     Bot Is Ready! Logged in as ${client.user.tag}     `
        ) +
        clc.cyanBright("┃")
    );
    console.log(
      clc.cyanBright(`     ┃ `) +
        " ".repeat(-1 + stringlength - ` ┃ `.length) +
        clc.cyanBright("┃")
    );
    console.log(
      clc.cyanBright(
        `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
      )
    );
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    client.user.setActivity("Otaku's", { type: "WATCHING" });
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    const readylog_embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(client.user.tag, client.user.avatarURL())
      .setTitle(`${Emoji_Online}・Bot Is Ready`)
      .setDescription(`**__Ready! Logged in as ${client.user.tag}__**`)
      .setThumbnail(client.user.avatarURL());
    readylogchannel.send({ embeds: [readylog_embed] });
  },
};
