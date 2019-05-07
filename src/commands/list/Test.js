"use strict";

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
        client.requestClashOfClansApi("clans/%2322CGY098C", function(response){
            console.log(response);
        });
    }
}

module.exports = Test;