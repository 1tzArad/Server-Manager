const Discord = require("discord.js");
const db = require("quick.db");
let BotOwner = process.env.BotOwner;
let Emoji_Danger = process.env.Emoji_Danger;
module.exports = {
  name: "adminadd",
  description: "add admin to bot",
  aliases: ["newadmin", "addadmin"],
  async execute(message, args) {
    const user = args.join(' ');
    if (message.author.id !== BotOwner) {
      return message.reply({
        content: `${Emoji_Danger}・This command can only be used by bot admins and other people cannot use this command!`,
        ephemeral: true,
      });
    } else {
      let admins = (await db.get("admins")) || [];
      if (admins.includes(user.id)) {
        return message.reply({
          content: `${user.username}#${user.discriminator} is already a admin of the bot!`,
          ephemeral: true,
        });
      }
      admins.push(user.id);
      await db.set("admins", admins);
      const embed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .addField(`**New Admin Added Successful**`, `${user} is now a admin of the bot!`)
        // .setDescription(
          
        // )
        .setTimestamp();

      return message.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
