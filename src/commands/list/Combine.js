"use strict";

const discord = require("discord.js");

/**
 * Combine's class.
 */
class Combine {

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

module.exports = Combine;