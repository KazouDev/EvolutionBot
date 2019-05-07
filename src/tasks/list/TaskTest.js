"use strict";

/**
 * Task's class.
 */
class TaskTest {

    /**
     * On start of the bot, start task.
     * @param {Evolution} client 
     */
    runTask(client){
        setInterval(function(){
            console.log("Wallah 10s");
        }, 10000);
    }
}

module.exports = TaskTest;