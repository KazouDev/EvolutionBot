"use strict";

const IconTask = require("./list/IconTask.js");

/**
 * TaskHandler allows you to launch tasks.
 */
class TaskHandler {

    /**
     * TaskHandler's constructor, this is used for start different tasks.
     * @param {Evolution} client
     */
    constructor(client){
        new IconTask().runTask(client);
    }
}

module.exports = TaskHandler;