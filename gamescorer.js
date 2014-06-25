
var games = {"7wonders_v0":"./7wonders.js"};

exports.score = function(data) {
    console.log("hi");
    console.log("Scorer running for game: "+data["game"]);
    var game = require(games[data['game']]);
    return game.score(data);
}
