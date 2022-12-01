const { Message, Client } = require("guilded.js");

module.exports = {
	name: "echo",
	aliases: ["speak", "talk"],
	execute: (message, args) => {
		if (!args.length)
			return message.send("You must give me something to echo!");
		message.send(args.join(" "));
	},
};
