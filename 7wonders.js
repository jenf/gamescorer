define("7wonders", ["require","GameCommon"], function (require, GameCommon) {

	function SevenWonders() {}
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
	
	SevenWonders.prototype.showScore = function(data) {
		/* I'm unsure if this should be seperated ala MVC... Will develop and see if it needs refactoring */
		
		/* Summary screen show the winners by points */
		
		$("#finalScore").html("<h1>7 Wonders</h1>" +
				"<table><thead><tr><th>Player</th><th>Ranking</th><th>Score</th></tr></thead>" +
				"<tbody id='summary'></tbody></table>");
		
		for (var idx in data["players"]) {
			var player = data["players"][idx];
			$("#summary").append("<tr><td>"+player["playerName"]+"</td><td>"+player["rank"]+"</td><td>"+player["totalVP"]+"</td></tr>");
		}
		[{"Total VP":"totalVP"}]
	};
	
	return SevenWonders;
	
});