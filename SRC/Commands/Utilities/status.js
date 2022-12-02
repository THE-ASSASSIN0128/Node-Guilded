const { Client, Message, Embed } = require("guilded.js");
const { colour, owner, url } = require("../../config.json");
const { connection } = require("mongoose");
const moment = require("moment");
const pkg = require("../.../../../../package.json");
require("../../Events/Client/ready.js");

function rState(val) {
	var status = " ";
	switch (val) {
		case 0:
			status = `🔴 Disconnected`;
			break;
		case 1:
			status = `🟢 Connected`;
			break;
		case 2:
			status = `🟡 Connecting`;
			break;
		case 3:
			status = `🟣 Disconnecting`;
			break;
	}
	return status;
}

module.exports = {
	name: "status",
	aliases: ["stats"],
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 */
	execute: async (message, client) => {
		let days = Math.floor(client.readyTimestamp / 86400000) % 30;
		let hours = Math.floor(client.readyTimestamp / 3600000) % 24;
		let minutes = Math.floor(client.readyTimestamp / 60000) % 60;
		let seconds = Math.floor(client.readyTimestamp / 1000) % 60;

		let webLatency = new Date() - message.createdAt;
		let apiLatency = client.ws.ping;

		let emLatency = {
			Green: "🟢",
			Yellow: "🟡",
			Red: "🔴",
		};

		const stats = new Embed()
			.setColor(colour.main)
			.setTitle("GENERAL INFO")
			.setDescription(
				[
					`**🪧 Name :** ${client.user.name}`,
					`\**⚙️ Version :** ${pkg.version}`,
					`**👑 Owner :** THE ASSASSIN`,
					`**🌐 Website :** [Node](https://Node-Web.theassassin2.repl.co).`,
					`**\`Stay tuned for more updates.\`**`,
				].join("\n")
			)
			//.setThumbnail(client.user.avatar)
			.addFields([
				{
					name: "BOT INFO",
					value: [
						`**❕ Status** :  🟢 Online`,
						`**🏓 Ping** : Web ${webLatency}ms | api ${apiLatency}ms`,
						`**⏱️ Uptime** : \`${days}Days, ${hours}Hours, ${minutes}Minutes, ${seconds}Seconds\``,
					].join("\n"),
				},
				{
					name: "DataBase INFO",
					value: [
						`**🪧 Name :** MongoDB`,
						`**❕ Status :** ${rState(connection.readyState)}`,
					].join("\n"),
				},
				{
					name: "HOST & LIBRARY INFO",
					value: [
						`**🪧 Name :** replit.com (Not Using.)`,
						`📚 **Library :** guilded.js | V•${pkg.dependencies["guilded.js"]}`,
					].join("\n"),
				},
				{
					name: "**GitHub Repository**",
					value: [
						`**🪧 Name :** Node-Guilded`,
						`**🔗 Link :** [THE-ASSASSIN0128/Node-Guilded](https://github.com/THE-ASSASSIN0128/Node-Guilded)`,
					].join("\n"),
				},
			]);

		message.reply({
			embeds: [stats],
		});
	},
};
