"use strict";

const ClanUpdate = require("./list/ClanUpdate");
const WarUpdate = require("./list/WarUpdate");

/**
 * TaskHandler allows you to launch tasks.
 */
class TaskHandler {

    /**
     * TaskHandler's constructor, this is used for start different tasks.
     * @param {Evolution} client
     */
    constructor(client){
        new ClanUpdate().runTask(client);
        new WarUpdate().runTask(client);
    }
}

module.exports = TaskHandler;