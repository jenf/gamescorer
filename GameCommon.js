define("GameCommon", function () {

	function GameCommon() {}
	
	GameCommon.prototype.calculateWinnerHighScore = function(data) {
	    highest = null;
	    
	    console.log(data);
	    scores = data["players"].slice(0);
	    
	    scores.sort (function (a,b) {
	    	console.log("eek?" + a);
	    	a["totalVP"] - b["totalVP"];
	    });
	    
	    console.log("Awwoga" + scores[0]);
	    data["winner"]=scores[0]["playerName"];
	    data["winnerVP"]=scores[0]["totalVP"];
	    
	    for (var idx in scores) {
	    	scores[idx]["rank"]=1 + +idx; // Start at 1... somehow idx is a string...
	    }	    

	}
	
	GameCommon.prototype.calculateScoreFromVP = function(player, items) {
	    var totalVP = 0;
	    for (var item in items) {
	        totalVP += player[items[item]];
	        //console.log(items[item]+" "+player[items[item]]+" "+totalVP);
	    }
	    
	    player["totalVP"]= totalVP;
	    
	    return totalVP;
	}
	
	GameCommon.prototype.showScore = function(data) {
	}
	
	return GameCommon;

});