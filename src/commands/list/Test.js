"use strict";

const discord = require("discord.js");

/**
 * Test's class.
 */
class Test {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        console.log(client.requestClashOfClansApi("clans/%2322CGY098C"));
    }
}

module.exports = Test;