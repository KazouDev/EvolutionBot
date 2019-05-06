"use strict";

const discord = require("discord.js");

/**
 * Evolution's class.
 */
class Evolution {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        client.sendSimpleEmbed(message.channel, "Cette commmande est en développement...");
    }
}

module.exports = Evolution;