const { Client, Message, Embed } = require("guilded.js");

module.exports = {
	name: "ping",
	aliases: ["test"],
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 */
	execute: async (message, client) => {
		message.send(`Pong! | ${client.ws.ping}ms`);
	},
};
