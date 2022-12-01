async function loadCommands(client) {
	const { loadFiles } = require("../Loaders/loadFiles");
	const ascii = require("ascii-table");
	const table = new ascii("Commands").setHeading("files", "status");

	await client.commands.clear();

	let commands = [];

	const Files = await loadFiles("SRC/Commands");

	Files.forEach((file) => {
		const command = require(file);
		client.commands.set(command.name, command);

		table.addRow(command.name, "Success");
	});

	return console.log(table.toString());
}

module.exports = { loadCommands };
