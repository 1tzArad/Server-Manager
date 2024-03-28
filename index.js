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
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  MessageAttachment,
  TextInputStyle,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});
const fs = require("fs");
const internal = require("stream");
const path = require("path");
let config = require("./config.json");
let token = config.Bot.Token;
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
client.commands = new Collection();
let Emoji_Danger = process.env.Emoji_Danger;
const errorembed = new MessageEmbed()
  .setColor("RED")
  .setTitle(`${Emoji_Danger}・Error`)
  .setDescription(
    `Dar source code bot yek error injad shode ast ! \n \n lotfan name command khod ra ba ss ba estefade az ticket / </bugreport:1146835527899824269> baay staff hay ma ersal konid ta moshkel shoma ro ok konim !`
  );
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (!interaction.client.commands.has(commandName)) return;

  try {
    await interaction.client.commands.get(commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: interaction.user,
      embeds: [errorembed],
      ephemeral: true,
    });
  }
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=| Event Handler |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
const clc = require("cli-color");
let stringlength = 69;
let check_directory = fs.readdirSync("./config/events/").forEach((folder) => {
  fs.readdir(`./config/events/${folder}`, (err, allFiles) => {
    const jsFiles = allFiles.filter((jsFile) => jsFile.endsWith(".js"));
    jsFiles.forEach((eventFile) => {
      const event = require(`./config/events/${folder}/${eventFile}`);
      console.log(`     ┃ ${event.name} was loaded`);
      try {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
        console.log("loading EventHandler Code...\nStatus = Success");
      } catch (err) {
        console.log(
          "Loading EventHandler Code...\nStatus = Failure\nError :\n".err
        );
      }
    });
  });
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=| Load Handlers Folder |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
const handlersFolder = "./handlers";

const handlerFiles = fs.readdirSync(handlersFolder);

for (const handlerFile of handlerFiles) {
  if (handlerFile.endsWith(".js")) {
    const handlerPath = path.join(__dirname, handlersFolder, handlerFile);
    require(handlerPath);
  }
}
const messageaHndler = require("./handlers/messageHandler");
client.on("messageCreate", messageaHndler.execute);
const commandHandler = require("./handlers/commandHandler");
client.on("ready", () => {
  commandHandler.execute(client);
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=| Run The Bot |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
client.login(token);
