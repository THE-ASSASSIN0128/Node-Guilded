const ascii = require("ascii-table");
const { DataBase } = process.env;
const { connect } = require("mongoose");
const { ClientUser } = require("guilded.js");

module.exports = {
	name: "ready",
	once: true,
	/**
	 *
	 * @param {ClientUser} client
	 * @returns
	 */
	execute: async (client) => {
		console.log(`Ready! Logged in as ${client.name}`);
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
