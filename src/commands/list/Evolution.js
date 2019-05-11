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
        const embed = new discord.RichEmbed().setColor(client.defaultColor);

        client.requestClashOfClansApi("clans/" + ClanInfo.clanID, function(response){
            if(typeof args[0] === "string"){
                embed.setTitle("Evolution - " + args[0].charAt(0).toUpperCase() + args[0].substring(1).toLowerCase());
            } else {
                embed.setTitle("Evolution - Commandes");
            }

            embed.setThumbnail(response.badgeUrls.medium);

            switch(args[0]){
                default:
                    embed.setDescription("Voici la liste des commandes disponibles pour obtenir des informations sur le clan.");
                    embed.addField(client.prefix + "evolution info", "Obtenir les informations du clan.");
                    embed.addField(client.prefix + "evolution guerre", "Voir le nombre de guerre gagné et perdu, les guerres en cours...");
                    embed.addField(client.prefix + "evolution membres", "Obtenir une liste des membres du clan.");
                break;

                case "info":
                    //TODO
                break;
            }

            message.channel.send(embed);
        });
    }
}

module.exports = Evolution;