const fs = require("fs");
const { Collection } = require("discord.js");
module.exports = {
  name: "commandHandler",
  execute(client) {
    client.commands = new Collection();

    fs.readdirSync("./config/commands/interaction").forEach((folder) => {
      const folderPath = `./config/commands/interaction/${folder}`;
      const jsFiles = fs
        .readdirSync(folderPath)
        .filter((jsFile) => jsFile.endsWith(".js"));

      jsFiles.forEach((commandFile) => {
        const command = require(`../config/commands/interaction/${folder}/${commandFile}`);
        console.log(`     ┃ ${command.data.name} was loaded`);
        try {
          client.commands.set(command.data.name, command);
        } catch (err) {
          console.error(err);
        }
      });
    });
  },
};
