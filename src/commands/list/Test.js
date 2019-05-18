"use strict";

const ClanInfo = require("../../ClanInfo");

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
        client.requestClashOfClansApi("clans/" + ClanInfo.clanID + "/currentwar", function(response){
            console.log(response.state);
        });
    }
}

module.exports = Test;