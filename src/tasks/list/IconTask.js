"use strict";

/**
 * Task's class.
 */
class IconTask {

    /**
     * On start of the bot, start task for update a guild icon.
     * @param {Evolution} client 
     */
    runTask(client){
        setInterval(function(){
            client.requestClashOfClansApi("clans/%2322CGY098C", function(response){
                if(response.clanLevel === client.getClanLvl()){
                    return;
                } else {
                    client.guilds.get("572577531098562583").setImage(response.badgeUrls.medium);
                }
            });
        }, 60000);
    }
}

module.exports = IconTask;