const { aliases } = require("../../Commands/Moderation/clear");

async function loadCommands(client) {
	const { loadFiles } = require("../Loaders/loadFiles");
	const ascii = require("ascii-table");
	const table = new ascii("C0MMANDS").setHeading("files", "status");

	await client.commands.clear();
	await client.aliases.clear();

	let commands = [];

	const Files = await loadFiles("SRC/Commands");

	Files.forEach((file) => {
		const command = require(file);
		client.commands.set(command.name, command);

		if (command.aliases) {
			command.aliases.forEach((alias) => {
				client.aliases.set(alias, command.name);
			});
		}

		table.addRow(file.split("/")[8], "success");
	});

	return console.log(table.toString());
}

module.exports = { loadCommands };
