
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed, MessageAttachment } = require("discord.js");
require("dotenv").config();
let BotName = process.env.BotName;
let BotVersion = process.env.BotVersion;
let BotOwner = process.env.BotOwner;
// let BotIconURL = process.env.BotIconURL;
let AboutBanner = process.env.AboutBanner;
// Emoji
let Emoji_Ping = process.env.Emoji_Ping
let Emoji_Uptime = process.env.Emoji_Uptime
let Emoji_Version = process.env.Emoji_Version
let Emoji_Developer = process.env.Emoji_Developer
const attachment = new MessageAttachment('.assets/image/about_banner.png', 'about_banner.png')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription(`About Of ${BotName}`),
  async execute(interaction) {
    const duration = moment
      .duration(interaction.client.uptime)
      .format("[days] Days, [hrs] Hours And [mins] mins");
    const help_embed = new MessageEmbed()
      .setTitle(`About Of ${BotName}`)
      // .addField("<:Admin_Badge:1001800992528019487> Support Server :", "https://discord.gg/Epqc7ADcfk")
      .addField(
        `${Emoji_Ping} Bot Ping :`,
        `${Math.round(interaction.client.ws.ping)}ms`
      )
      .addField(`${Emoji_Uptime} Bot Uptime`, `${duration}`)
      .addField(
        `${Emoji_Version} Bot Version :`,
        `Version ${BotVersion}`
      )
      .addField(
        `${Emoji_Developer} Bot Developer :`,
        `<@${BotOwner}>`
      )
      .setThumbnail(interaction.client.user.avatarURL())
      .setTimestamp()
      .setImage(AboutBanner)
      .setFooter(`${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
      if(interaction.inGuild()){
        help_embed.setAuthor(interaction.guild.name, interaction.guild.iconURL())
        }
    await interaction.reply({ embeds: [help_embed] }).catch(console.error)
  },
};
