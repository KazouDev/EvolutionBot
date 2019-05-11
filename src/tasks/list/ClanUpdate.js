"use strict";

const ClanInfo = require("../../ClanInfo");

const fs = require("fs");

/**
 * Task's class.
 */
class ClanUpdate {

    /**
     * Update the config of clan, clan icon, player combined account name...
     * @param {Evolution} client 
     */
    runTask(client){
        setInterval(function(){
            client.requestClashOfClansApi("clans/"+ ClanInfo.clanID, function(response){
                if(response.clanLevel !== ClanInfo.clanLvl){
                    client.guilds.get("572577531098562583").setIcon(response.badgeUrls.large);
                    client.user.setAvatar(response.badgeUrls.large);
                }

                let clan = JSON.parse(fs.readFileSync("./resources/clan.json"));

                clan["lvl"] = reponse.clanLevel;

                client.writeJson("clan", clan);
            });
        }, 1000 * 60 * 5);
    }
}

module.exports = ClanUpdate;