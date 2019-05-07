"use strict";

const TestTask = require("./list/TaskTest.js");

/**
 * TaskHandler allows you to launch tasks.
 */
class TaskHandler {

    /**
     * TaskHandler's constructor, this is used for start different tasks.
     * @param {Evolution} client
     */
    constructor(client){
        client.on("ready", () => {
            new TestTask().runTask(client);
        });
    }
}

module.exports = TaskHandler;