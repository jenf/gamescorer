exports.score = function(data) {
    console.log("7 wonders!");
    
    sum = function(player, items) {
        var totalVP = 0;
        for (var item in items) {
            totalVP += player[items[item]];
        }
        return totalVP;
    }

    calculateWinnerHighScore = function(data) {
        highest = null;
        
        for (var idx in data["players"]) {
            var current = data["players"][idx];
            if (highest == null || current["totalVP"] > highest["totalVP"]) {
                highest = current;
            }
        }
        
        data["winner"]=highest["playerName"];
        data["winnerVP"]=highest["totalVP"];
    }
    
    scorePlayer = function(player) {
        //  Calculate gold
        player["goldVP"] = Math.floor(player["gold"] / 3);

        // Science Identical symbols
        player["scienceIdenticalVP"] = player["scienceGears"]*player["scienceGears"] + player["scienceTablet"]*player["scienceTablet"] + player["scienceMeasurement"]*player["scienceMeasurement"];

        // Science sets
        player["scienceSetVP"] = Math.min(player["scienceGears"], player["scienceTablet"], player["scienceMeasurement"])*7;

        var totalVP = sum(player, ["militaryVP", "goldVP", "wonderVP", "civilianVP", "scienceIdenticalVP", "scienceSetVP", "commercialVP", "guildVP"]);

        player["totalVP"]= totalVP;
        
    }

    for (var idx in data["players"]) {
        if (data["players"][idx]["playerName"]==undefined) {
            data["players"][idx]["playerName"]="Player "+(idx+1);
        }
        scorePlayer(data["players"][idx]);
    }
    
    calculateWinnerHighScore(data);
    return data;
}
