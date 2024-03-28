// messageCreate.js
const { readdirSync } = require("fs");
const { join } = require("path");
module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.bot) return;
    const prefix = process.env.BotPrefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const commandsDir = join(__dirname, "..", "config", "commands", "messages");

    try {
      const commandFiles = readdirSync(commandsDir, { recursive: true }).filter(
        (file) => file.endsWith(".js")
      );

      for (const file of commandFiles) {
        const command = require(join(commandsDir, file));
        if (command.name === commandName) {
          command.execute(message, args);
          return;
        } else if (command.aliases && command.aliases.includes(commandName)) {
          // بررسی دستورات جایگزین
          command.execute(message, args);
          return;
        }
      }

      // اگر دستور پیدا نشد، به دنبال فایل‌های داخل زیرفولدرها نیز بگردید
      const subfolders = readdirSync(commandsDir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);

      for (const folder of subfolders) {
        const folderPath = join(commandsDir, folder);
        const folderCommandFiles = readdirSync(folderPath).filter((file) =>
          file.endsWith(".js")
        );

        for (const file of folderCommandFiles) {
          const command = require(join(folderPath, file));
          if (command.name === commandName) {
            command.execute(message, args);
            return;
          } else if (command.aliases && command.aliases.includes(commandName)) {
            // بررسی دستورات جایگزین
            command.execute(message, args);
            return;
          }
        }
      }
      setTimeout(function () {
        message.delete();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  },
};
