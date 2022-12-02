const ascii = require("ascii-table");
const { DataBase } = process.env;
const { connect } = require("mongoose");
const { ClientUser, Client } = require("guilded.js");

module.exports = {
	name: "ready",
	once: true,
	/**
	 *
	 * @param {Client} client
	 * @returns
	 */
	execute: async (client) => {
		console.log(`Ready! Logged in as ${client.user.name}`);
		if (!DataBase) return;
		try {
			connect(DataBase, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("DataBase is Connected.");
		} catch (error) {
			console.error(error);
		}
	},
};
