"use strict";

const Message = require("./list/Message");
const Ready = require("./list/Ready");

/**
 * EventHandler allows you to launch events.
 */
class EventHandler {

    /**
     * EventHandler's constructor, this is used for start different events.
     * @param {Evolution} client
     */
    constructor(client){
        client.on("ready", () => {
            new Ready().ready(client);
        });

        client.on("message", message => {
            new Message().message(client, message);
        });
    }
}

module.exports = EventHandler;