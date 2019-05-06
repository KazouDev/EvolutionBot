"use strict";

const Message = require("./list/Message");

/**
 * EventHandler allows you to launch events.
 */
class EventHandler {

    /**
     * EventHandler's constructor, this is used for start different events.
     * @param {Evolution} client
     */
    constructor(client){
        client.on("message", message => {
            new Message().message(client, message);
        });
    }
}

module.exports = EventHandler;