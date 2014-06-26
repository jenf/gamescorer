
function GameCommon() {}

GameCommon.prototype.calculateWinnerHighScore = function(data) {
    highest = null;
    
    for (var idx in data["players"]) {
        var current = data["players"][idx];
        if (highest == null || current["totalVP"] > highest["totalVP"]) {
            highest = current;
        }
    }
    
    data["winner"]=highest["playerName"];
    data["winnerVP"]=highest["totalVP"];
    return highest;
}

GameCommon.prototype.calculateScoreFromVP = function(player, items) {
    var totalVP = 0;
    for (var item in items) {
        totalVP += player[items[item]];
    }
    
    player["totalVP"]= totalVP;
    return totalVP;
}

exports.GameCommon = GameCommon;