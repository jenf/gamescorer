define("gamescorer", ["require", "7wonders"], function (require, SevenWonders) {

	var games = {"7wonders_v0":SevenWonders};
	
	function GameScorer() {};
	
	GameScorer.prototype.getScorer = function(scorer) {

	    var game = games[scorer];
	    console.log("Scorer loaded for game: "+scorer+" "+game);   
	    return new game();
	}
	
	return GameScorer;
});