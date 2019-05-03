"use strict";

// Register discord.js module and create the client:
const discord = require("discord.js");
const Bot = new discord.Client();

// Connect the bot:
Bot.login("NTczMjU0OTAxMTAzMzI5MzQx.XMoLZA.BQOc_SkY7fkyxD8r8SfEi3mUZZc");

// Create the bot instance:
const Evolution = require("./src/Evolution");
new Evolution(discord, Bot);