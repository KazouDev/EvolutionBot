"use strict";

const discord = require("discord.js");

/**
 * Help's class.
 */
class Help {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        const embed = new discord.RichEmbed().setColor(client.defaultColor);

        switch(args[0]){
            case "chef":
                embed.setTitle("Liste des commandes de chef:");
                embed.addField(client.prefix + "combine [Tag Coc] [Utilisateur]", "Combiné un compte Clash of clan avec un compte Discord.");
            break;

            default:
                embed.setTitle("Liste des commandes:");
                embed.setDescription("Vous pouvez obtenir la liste des commandes des chefs via la commande **" + client.prefix + "help chef** !");
                embed.addField(client.prefix + "evolution", "Obtenir des informations sur le clan.");
                embed.addField(client.prefix + "participe [gdc - ligue]", "Participez à la prochaine guerre de clan/ligue.");
            break;
        }

        message.channel.send(embed);
    }
}

module.exports = Help;