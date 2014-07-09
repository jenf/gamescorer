define("gamescorer", ["require", "7wonders"], function (require, SevenWonders) {

	var games = {"7wonders_v0":SevenWonders};
	
	function GameScorer() {};
	
	GameScorer.prototype.getScorer = function(scorer) {

	    var game = games[scorer];
	    console.log("Scorer loaded for game: "+scorer+" "+game);   
	    return new game();
	}
	
	GameScorer.prototype.chooseGameUI = function(data) {
		
		// The data will disappear soon
		var so = this;
		
		$("#chooseGame").html("");
		
		for (var idx in games) {
			console.log(idx);
			var newElem = $('<button class="chooseGame ui-btn ui-corner-all">'+games[idx].prototype.name+'</button>');
			newElem.data("idx",idx);
			$("#chooseGame").append(newElem);

		}
		$(".chooseGame").click(function(e) {
			
			
			console.log($(this).data("idx"));
			var game = so.getScorer($(this).data("idx"));
			console.log(game);
			game.setData(data);
			//game.askPlayers();
			
			dataout = game.score();
			game.showScore(dataout);
		});
	}
	
	return GameScorer;
});