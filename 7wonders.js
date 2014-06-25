exports.score = function(data) {
    console.log("7 wonders!");
    
    sum = function(player, items) {
        var totalVP = 0;
        for (var item in items) {
            totalVP += player[items[item]];
        }
        return totalVP;
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
        scorePlayer(data["players"][idx]);
    }
    return data;
}
