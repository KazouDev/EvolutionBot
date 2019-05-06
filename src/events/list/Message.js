"use strict";

/**
 * Message's class.
 */
class Message {

    /**
     * When a user or a bot send a message.
     * @param {Evolution} client 
     * @param {Message} message 
     */
    message(client, message){
        if(message.author.bot) return;

        if(message.content.indexOf(client.user.id) != -1){
            client.sendSimpleEmbed(message.channel, "Vous pouvez faire **" + client.prefix + "help** pour voir la liste des commandes que je pocéde !");
        }
    }
}

module.exports = Message;