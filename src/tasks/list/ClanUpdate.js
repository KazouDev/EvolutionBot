"use strict";

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
            client.requestClashOfClansApi("clans/%2322CGY098C", function(response){
                if(response.clanLevel === client.clanLvl) return;

                let clan = JSON.parse(fs.readFileSync("./resources/clan.json"));

                client.guilds.get("572577531098562583").setIcon(response.badgeUrls.medium);
                client.user.setAvatar(response.badgeUrls.medium);

                clan = {
                    "lvl": response.clanLevel
                }

                client.writeJson("clan", clan);
            });
        }, 1000 * 60);
    }
}

module.exports = ClanUpdate;