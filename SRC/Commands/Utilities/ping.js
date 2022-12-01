const { Client, Message, Embed } = require("guilded.js");

module.exports = {
	name: "ping",
	aliases: ["p"],
	/**
	 *
	 * @param {Message} message
	 */
	execute: async (message) => {
		message.send("Pong!");
	},
};
