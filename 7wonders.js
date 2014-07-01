

function SevenWonders() {}

GameCommon = require("./GameCommon.js").GameCommon;
SevenWonders.prototype = new GameCommon(); 

SevenWonders.prototype.scorePlayer = function(player) {
    //  Calculate gold
    player["goldVP"] = Math.floor(player["gold"] / 3);

    // Science Identical symbols
    player["scienceIdenticalVP"] = player["scienceGears"]*player["scienceGears"] + player["scienceTablet"]*player["scienceTablet"] + player["scienceMeasurement"]*player["scienceMeasurement"];

    // Science sets
    player["scienceSetVP"] = Math.min(player["scienceGears"], player["scienceTablet"], player["scienceMeasurement"])*7;
    
    this.calculateScoreFromVP(player, ["militaryVP", "goldVP", "wonderVP", "civilianVP", "scienceIdenticalVP", "scienceSetVP", "commercialVP", "guildVP"]);


}

SevenWonders.prototype.score = function(data) {
    console.log("7 wonders!");
       
    for (var idx in data["players"]) {
        if (data["players"][idx]["playerName"]==undefined) {
            data["players"][idx]["playerName"]="Player "+(idx+1);
        }
        this.scorePlayer(data["players"][idx]);
        
    }
    
    this.calculateWinnerHighScore(data);
    return data;
}

exports.SevenWonders = SevenWonders;
