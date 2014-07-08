define("7wonders", ["require","GameCommon"], function (require, GameCommon) {

	function SevenWonders() {}
	SevenWonders.prototype = new GameCommon(); 
	
	var english = {"militaryVP":"VP from Military",
			"goldVP":"VP from Gold",
			"wonderVP": "VP from wonders",
			"civilianVP": "VP from civic buildings",
			"scienceIdenticalVP": "VP from identical Science buildings",
			"scienceSetVP": "VP from set of Science buildings",
			"commercialVP": "VP from commercial buildings",
			"guildVP": "VP from guild buildings",
			"gold":"Total Gold",
			"scienceGears":"Buildings with gears",
			"scienceTablet":"Buildings with tablets",
			"scienceMeasurement":"Buildings with measurements"
		}
	
	var vpFields = ["militaryVP", "goldVP", "wonderVP", "civilianVP", "scienceIdenticalVP", "scienceSetVP", "commercialVP", "guildVP"]; 
	var otherFields = ["gold","scienceGears", "scienceTablet", "scienceMeasurement"];
	
	SevenWonders.prototype.scorePlayer = function(player) {
	    //  Calculate gold
	    player["goldVP"] = Math.floor(player["gold"] / 3);
	
	    // Science Identical symbols
	    player["scienceIdenticalVP"] = player["scienceGears"]*player["scienceGears"] + player["scienceTablet"]*player["scienceTablet"] + player["scienceMeasurement"]*player["scienceMeasurement"];
	
	    // Science sets
	    player["scienceSetVP"] = Math.min(player["scienceGears"], player["scienceTablet"], player["scienceMeasurement"])*7;
	    
	    this.calculateScoreFromVP(player, vpFields);
	
	
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
			
			full_details = "";
			
			var fields = vpFields.concat(otherFields);
			for (x in fields) {
				var item = fields[x];
				var text = english[item];
				
				if (vpFields.indexOf(item) == -1) {
					text = "<i>"+text+"</i>"
				}
					
				full_details += "<tr><td>"+text+"</td><td>"+player[item]+"</td>";
			}
			
			$("#summary").append("<tr><td>"+player["playerName"]+"</td><td>"+player["rank"]+"</td>" +
					"<td><div data-role='collapsible'><h3>"+player["totalVP"]+"</h3><p><table>"+full_details+"</table></p></div></td></tr>");
		}
		
		// Kick jquery mobile to create the relevant magic.
		$("#summary").trigger("create");
		
	};
	
	return SevenWonders;
	
});