"use strict";

/**
 * Ready's class.
 */
class Ready {

    /**
     * When the bot's is started.
     * @param {Evolution} client 
     */
    ready(client){
        console.log("Info: " + client.user.username + " was started.");
    }
}

module.exports = Ready;