define("gamescorer", ["require", "7wonders"], function (require, SevenWonders) {

	var games = {"7wonders_v0":SevenWonders};
	
	function GameScorer() {};
	
	GameScorer.prototype.score = function(data) {
	    console.log("Scorer running for game: "+data["game"]);
	    var game = games[data['game']];
	    
	    scorer = new game();
	    
	    console.log(scorer);
	    return scorer.score(data);
	}
	
	return GameScorer;
});