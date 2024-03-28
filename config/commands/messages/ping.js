module.exports = {
  name: "ping",
  description: "Ping the bot",
  aliases: ["ms", "latency"],
  execute(message, args, client) {
    message.reply(`Pong 🏓`);
  },
};