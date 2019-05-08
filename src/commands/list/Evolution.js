"use strict";

const ClanInfo = require("../../ClanInfo");

const discord = require("discord.js");

/**
 * Evolution's class.
 */
class Evolution {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        client.requestClashOfClansApi("clans/" + ClanInfo.clanID, function(response){
            const embed = new discord.RichEmbed().setColor(client.defaultColor);

            const memberList = response.memberList.map(function(element){
                return "(" + element.role + ") " + element.name;
            })

            embed.setTitle("Evolution");
            embed.setDescription(response.description);
            embed.setThumbnail(response.badgeUrls.small);

            embed.addField("Membres (" + response.members + ")", memberList.join(", ") + ".");

            embed.addField("Nombre de guerre gagné", response.warWins);
            embed.addField("Nombre de guerre perdu", response.warLosses);

            message.channel.send(embed);
        });
    }
}

module.exports = Evolution;