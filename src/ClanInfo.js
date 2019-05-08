"use strict";

const fs = require("fs");
const request = require("request");

/**
 * ClanInfo's class for get clan's information with static method and property.
 */
class ClanInfo {

    /**
     * Return clan level.
     */
    static get clanLevel(){
        const clan = JSON.parse(fs.readFileSync("./resources/clan.json"));

        return clan.lvl;
    }
    /**
     * Return clan id.
     */
    static get clanID(){
        const clan = JSON.parse(fs.readFileSync("./resources/clan.json"));

        return clan.id.replace("#", "%23");
    }

    /**
     * Get Clash of Clans tag by discord user account,
     * You must to use /combine command for associate dicord and clash of clan account.
     * @param {string} userid 
     */
    static getMemberTag(userid){
        const comb = JSON.parse(fs.readFileSync("./resources/combine.json"));

        if(comb[userid]){
            return comb[userid];
        } else {
            return "ID indéfini.";
        }
    }
}

module.exports = ClanInfo;