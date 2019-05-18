"use strict";

const ClanInfo = require("../../ClanInfo");

const fs = require("fs");
const discord = require("discord.js");
const moment = require("moment");

let clan = JSON.parse(fs.readFileSync("./resources/clan.json"));

/**
 * Task's class.
 */
class WarUpdate {

    /**
     * War Task.
     * @param {Evolution} client 
     */
    runTask(client){
        setInterval(function(){
            client.requestClashOfClansApi("clans/"+ ClanInfo.clanID + "/currentwar", function(response){
                if(clan["inwar"] === false){
                    if(response.state === "inWar"){
                        clan["inwar"] = true;

                        client.writeJson("clan", clan);

                        let clanMember = Array();

                        response.clan.members.forEach(element => {
                            clanMember.push(element.name)
                        });

                        let opponentMember = Array();

                        response.opponent.members.forEach(element => {
                            opponentMember.push(element.name)
                        });

                        const embed = new discord.RichEmbed().setColor(client.defaultColor);
                        
                        embed.setTitle(response.clan.name + " VS " + response.opponent.name);
                        embed.addField("Nombre de joueurs", response.teamSize);
                        embed.addField("Jours de Guerre", moment(response.startTime).format("LLL"));
                        embed.addField("Fin de la Guerre", moment(response.endTime).format("LLL"));
                        embed.addField("Fin dans", moment(moment(response.endTime) - Date.now() - 3600000).format("HH:mm:ss"));
                        embed.addField("Membres " + response.clan.name, clanMember.join(", ") + ".");
                        embed.addField("Membres " + response.opponent.name, opponentMember.join(", ") + ".")

                        client.channels.get("575056510267293714").send(embed);
                        console.log("inWar");
                    }
                }
            });
        }, 1000 * 10);
    }
}

module.exports = WarUpdate;