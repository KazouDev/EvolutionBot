"use strict";

const Client = require("discord.js/src/client/Client");

const EventHandler = require("./events/EventHandler");
const CommandHandler = require("./commands/CommandHandler");

const discord = require("discord.js");
const fs = require("fs");

const prefix = "!";
const defaultColor = "#FF0101";

/**
 * Client's base class.
 * @extends {Client}
 */
class Evolution extends Client {

    /**
     * Client's constructor.
     * @param {discord.js} discord
     * @param {Client} Bot 
     */
    constructor(){
        super();

        // Connect the bot with its token:
        this.login(this.getPrivateData("token"));

        // Create instance of EventHandler, CommandHandler and TaskHandler:
        new EventHandler(this);
        new CommandHandler(this);
        new TaskHandler(this);
    }

    /**
     * Get the prefix for commands.
     */
    get prefix(){
        return prefix;
    }

    /**
     * Get the default color of the bot.
     */
    get defaultColor(){
        return defaultColor;
    }

    /**
     * Get private data information in configuration.
     * @param {string} information
     * @return {string}
     */
    getPrivateData(information){
        const data = JSON.parse(fs.readFileSync("./resources/privateAcces.json", "utf8"));

        if(data[information]){
            return data[information];
        } else {
            console.log("Error: " + information + " is undefined privateAcces.json, client stopped.");
            this.destroy();
        }
    }

    sendSimpleEmbed(channel, description){
        if(!channel instanceof discord.Channel) return;

        const embed = new discord.RichEmbed().setColor(this.defaultColor);

        if(typeof description === "string"){
            channel.send(embed.setDescription(description));
        } else {
            channel.send(embed.setDescription(":x: Une erreur c'est produite lors de la création du message."));
        }  
    }
}

module.exports = Evolution;