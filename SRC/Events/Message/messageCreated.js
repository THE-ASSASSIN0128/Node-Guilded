require("dotenv").config();
const { Embed, Message, ClientUser } = require("guilded.js");
const { image, colour, bot } = require("../../config.json");
const { version } = require("../../../package.json");

module.exports = {
	name: "messageCreated",
	execute: async (message, client) => {
		if (message.isPrivate === "true") return;
		const prefix = process.env.PREFIX;

		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);

		const cmd = args.shift().toLowerCase();

		if (cmd.length === 0) return;

		const command =
			client.commands.get(cmd) ||
			client.commands.get(client.aliases.get(cmd));

		if (!command)
			return message.send(
				new Embed()
					.setAuthor("ERROR", image.error)
					.setDescription(
						`The command you used **[${cmd}]** is not a valid command.\n\nIf you need any help with the commands use **G!help** for more info.`
					)
					.setColor(colour.error)
					.setThumbnail(image.error)
					.setFooter(`Node Bot | V•${version}`)
					.setTimestamp()
			);

		try {
			command.execute(message, args);
		} catch (error) {
			await message.send(
				new Embed()
					.setAuthor("ERROR", image.error)
					.setColor(colour.error)
					.setDescription(
						`There was an error while executing the command.\n**ERROR :**\n${error}`
					)
					.setThumbnail(image.error)
					.setFooter(`Node Bot | V•${version}`)
					.setTimestamp()
			);
		}
	},
};
