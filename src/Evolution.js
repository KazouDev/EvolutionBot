"use strict";

const Client = require("discord.js/src/client/Client");

const EventHandler = require("./events/EventHandler");
const CommandHandler = require("./commands/CommandHandler");
const TaskHandler = require("./tasks/TaskHandler");

const discord = require("discord.js");
const fs = require("fs");
const request = require("request");

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

    /**
     * Get information in Clash of Clans API.
     * @param {string} path
     * @param {function} callback
     */
    requestClashOfClansApi(path, callback){
        if(typeof path !== "string"){
            console.log("Error: requestClashOfClansApi() first argument require a string.");
            this.destroy();
        }

        let rep;

        request.get({
            method: "GET",
            url: "https://api.clashofclans.com/v1/" + path,
            headers: {
                "Authorization": "Bearer " + this.getPrivateData("api-coc-token"),
                "Accept": "application/json"
            }
        }, (error, response, body) => {
            if(Array(400, 403, 404, 429, 500, 503).indexOf(response.statusCode) !== -1){
                console.log("Error: " + response.statusCode.reason);
                this.destroy();
            }
            
            if(!error && response.statusCode === 200){
                const rep = JSON.parse(body);

                if(rep){
                    callback(rep);
                } else {
                    return console.log("Error: Request don't work.");
                    this.destroy();
                }
            }
        });
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

    writeJson(file, data){
        if(!file || !data){
            console.log("Error: You don't indicate the file or data.");
            this.destroy();
        } else {
            fs.writeFile("./resources/" + file + ".json", JSON.stringify(data, null, "\t")), err => {
                console.log("Error:" + err);
                this.destroy();
            }
        }
    }
}

module.exports = Evolution;