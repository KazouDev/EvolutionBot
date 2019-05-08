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
                    var clan = JSON.parse(fs.readFileSync("./resources/clan.json"));

                    client.guilds.get("572577531098562583").setImage(response.badgeUrls.medium);
                    clan.level = client.getClanLvl + 1;

                    client.writeJson(clan, clan);
                    
                }
            });
        }, 60000);
    }
}

module.exports = IconTask;