//Requiring All Perameters
require("dotenv/config");
const { Client } = require("guilded.js");
const { Collection } = require("@discordjs/collection");
const client = new Client({ token: process.env.TOKEN });

//Functions
const { loadCommands } = require("./Functions/Handlers/commands.js");
const { loadEvents } = require("./Functions/Handlers/events.js");

//Collections
client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

//Executuing Functions to load Commands & Events
loadCommands(client);
loadEvents(client);

//Login Using The TOKEN
client.login();
