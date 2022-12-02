async function loadEvents(client) {
	const {
		loadFiles,
	} = require(`${process.cwd()}/SRC/Functions/Loaders/loadFiles.js`);
	const ascii = require("ascii-table");
	const table = new ascii("EVENTS").setHeading("files", "status");

	await client.events.clear();

	const Files = await loadFiles("SRC/Events");

	Files.forEach((file) => {
		const event = require(file);

		const execute = (...args) => event.execute(...args, client);
		client.events.set(event.name, execute);

		if (event.rest) {
			if (event.once) {
				client.rest.once(event.name, execute);
			} else {
				client.rest.on(event.name, execute);
			}
		} else {
			if (event.once) {
				client.once(event.name, execute);
			} else {
				client.on(event.name, execute);
			}
		}

		table.addRow(file.split("/")[8], "success");
	});

	return console.log(table.toString());
}

module.exports = { loadEvents };
