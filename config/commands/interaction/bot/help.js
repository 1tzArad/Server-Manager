const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
  Emoji,
} = require("discord.js");
let BotName = process.env.BotName;
let GuildName = process.env.GuildName;
let BotPrefix = process.env.BotPrefix;
let Emoji_Danger = process.env.Emoji_Danger;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("helplist")
    .setDescription(`${BotName}'s HelpList`),
  async execute(interaction) {
    const main = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("main")
        .setPlaceholder("Click Here")
        .addOptions([
          {
            label: "Economy Commands",
            emoji: "🏛",
            value: "economy_option",
          },
          {
            label: "Information Commands",
            emoji: "❔",
            value: "info_option",
          },
          {
            label: "Other Commands",
            emoji: "🔰",
            value: "other_option",
          },
        ])
    );

    const homebtn = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("homebtn")
        .setLabel("Home")
        .setStyle("SUCCESS")
        .setEmoji("🏡")
    );
    const homebtnDisabled = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("homebtn")
        .setLabel("Home")
        .setDisabled(true)
        .setStyle("SUCCESS")
        .setEmoji("🏡")
    );

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=| Embeds |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    let main_embed = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor(`${BotName} Help :`, interaction.client.user.avatarURL())
      .setDescription(
        `> **${BotName}** ye bot private baray server **${GuildName}** mi bashad ke command hay motenaveii bara user ha va admin hay server darad ke mi tone komak kone ke member hay server bishtar az server lezat bebaran.\n\n> Prefix Bot \`/\` va \`${BotPrefix}\` mi bashad !\n\n> baray iin ke betonid list command haro bebinid mitonid az menu zir estefade konid o category mored nazaro select konid o list command hay bot ro moshahede konid!`
      )
      .setFooter(
        `Requested By ${interaction.user.tag}`,
        interaction.user.avatarURL()
      );

    let other_embed = new MessageEmbed()
      .setColor("LIGHT_GREY")
      .setAuthor(`Other Commands :`, interaction.client.user.avatarURL())
      .setDescription(
        `🤴🏻 </ticket:1147605666895249532>\n👮🏻‍♂️ </news:1147605666895249530>\n👤 </suggest:1147605666895249531>\n👤 </bugreport:1147605666895249529>`
      );
    let economy_embed = new MessageEmbed()
      .setColor("LIGHT_GREY")
      .setAuthor(`Economy Commands :`, interaction.client.user.avatarURL())
      .setDescription(
        ``
      );

    let main_message = await interaction.reply({
      embeds: [main_embed],
      components: [main, homebtnDisabled],
    });

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=| Select Menu Collector - Main |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\

    const filter = (i) => i.customId === "main";

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 120000,
    });
    collector.on("collect", async (i) => {
      if (i.values[0] === "other_option") {
        await i.update({ embeds: [other_embed], components: [main, homebtn] });
      }
    });

    collector.on("end", async (i) => {
      const main_disable = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("main-disable")
          .setPlaceholder("Click Here")
          .setDisabled(true)
          .addOptions([
            {
              label: "Economy Commands",
              emoji: "🏛",
              value: "economy_option",
            },
            {
              label: "Information Commands",
              emoji: "❔",
              value: "info_option",
            },
            {
              label: "Other Commands",
              emoji: "🔰",
              value: "other_option",
            },
          ])
      );
      await interaction.editReply({ components: [main_disable] });
    });

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=| Btn Collector - Homebtn |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\
    const filterhomebtn = (i) => i.user.id === interaction.user.id;

    const collectorhomebtn =
      interaction.channel.createMessageComponentCollector({
        filterhomebtn,
        time: 15000,
      });

    collectorhomebtn.on("collect", async (i) => {
      if (i.customId === "homebtn") {
        await i.update({
          embeds: [main_embed],
          components: [main, homebtnDisabled],
        });
      }
    });
  },
};
