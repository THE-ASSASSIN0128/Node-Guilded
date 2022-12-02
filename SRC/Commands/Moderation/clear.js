module.exports = {
	name: "clear",
	aliases: ["purge", "delete"],
	execute: async (message, client, args) => {
		message.send("Test");
	},
};
