define("7wonders", ["require","GameCommon"], function (require, GameCommon) {

	function SevenWonders() {
		this.data = {"game":this.json_name};
	}
	
	SevenWonders.prototype = new GameCommon(); 
	
	SevenWonders.prototype.english = {"militaryVP":"VP from Military",
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

	SevenWonders.prototype.name = "7 wonders";
	SevenWonders.prototype.json_name = "7wonders_v0";
	SevenWonders.prototype.questions_start = "militaryVP";
	SevenWonders.prototype.questions =
	{"militaryVP" : {
	    /* title: if you want to not use the english text */
	    "description":"VP from <span style='color:red'>Conflict</span> tokens",
	    "method":"number",
	    "next":"gold"},
	 "gold": {
	     "description":"<span style='color:DarkGoldenRod'>Gold</span> from each players treasury",
	     "method":"number",
	     "next":"wonderVP"},
	 "wonderVP": {
	     "description":"VP from Constructed Wonders",
	     "method":"number",
	     "next":"civilianVP"},
	 "civilianVP": {
	     "description":"VP from <span style='color:royalblue'>Civilian</span> buildings",
	     "method":"number",
	     "next":"scienceGears"},
	 "scienceGears": {
	     "description":"Number of <span style='color:green'>Science</span> buildings with gears on them",
	     "method":"number",
	     "next":"scienceTablet"},
	 "scienceTablet": {
	     "description":"Number of <span style='color:green'>Science</span> buildings with tablets on them",
	     "method":"number",
	     "next":"scienceMeasurement"},
     "scienceMeasurement": {
	         "description":"Number of <span style='color:green'>Science</span> buildings with calipers/measurement on them",
	         "method":"number",
	         "next":"commercialVP"
	         },
	 "commercialVP": {
		 "description":"VP from <span style='color:orange'>Commercial</span> buildings",
		 "method":"number",
	     "next":"guildVP"
	 },
	 "guildVP": {
	     "description":"VP from <span style='color:purple'>Guild</span> buildings",
	     "method":"number",
	     /*no next as done*/
	     },
    };
	
	console.log(SevenWonders.prototype.questions);
	
	
	SevenWonders.prototype.scorePlayer = function(player) {
	    //  Calculate gold
	    player["goldVP"] = Math.floor(player["gold"] / 3);
	
	    // Science Identical symbols
	    player["scienceIdenticalVP"] = player["scienceGears"]*player["scienceGears"] + player["scienceTablet"]*player["scienceTablet"] + player["scienceMeasurement"]*player["scienceMeasurement"];
	
	    // Science sets
	    player["scienceSetVP"] = Math.min(player["scienceGears"], player["scienceTablet"], player["scienceMeasurement"])*7;
	    
	    this.calculateScoreFromVP(player, vpFields);
	
	
	}
	
	SevenWonders.prototype.score = function() {
	    var data = this.data;
	    
	    console.log(this.data);
	    
	    for (var idx in data["players"]) {
	        if (data["players"][idx]["playerName"]==undefined) {
	            data["players"][idx]["playerName"]="Player "+(idx+1);
	        }
	        this.scorePlayer(data["players"][idx]);
	        
	    }
	    
	    this.calculateWinnerHighScore(data);
	    return data;
	}
	
	SevenWonders.prototype.askPlayers = function(data) {
		$.mobile.pageContainer.append('<div data-role="page" id="SevenWondersScore_players"></div>');
		$("#SevenWondersScore_players").html('<label for="text-1">Player 1:</label>'+
			'<input name="text-1" id="text-1" value="" type="text">'+
			'<div data-role="controlgroup" data-type="horizontal" data-mini="true">'+
			'<a href="#" class="ui-shadow ui-btn ui-corner-all ui-btn-icon-left ui-icon-plus ui-btn-b">Add</a>'+
		    '<a href="#" class="ui-shadow ui-btn ui-corner-all ui-btn-icon-left ui-icon-delete ui-btn-b">Remove</a></div>');
		
		// Kick jquery mobile to create the relevant magic.
		$("#SevenWondersScore_players").trigger("create");
		$.mobile.changePage("#SevenWondersScore_players");
	}

	
	SevenWonders.prototype.showScore = function() {
		/* I'm unsure if this should be seperated ala MVC... Will develop and see if it needs refactoring */
		
		var displayFields = ["scienceGears", "scienceTablet", "scienceMeasurement", "scienceIdenticalVP", "scienceSetVP",
		                     "gold","goldVP",
		                     "wonderVP", "civilianVP", "commercialVP", "guildVP"];
		var data = this.data;
		
		console.log(data);
		fields = "";
		for (x in displayFields) {
			var item = displayFields[x];
			var text = this.english[item];
			
			if (vpFields.indexOf(item) == -1) {
				text = "<i>"+text+"</i>"
			}
			fields += "<th>"+text+"</th>";
		}
		/* Summary screen show the winners by points */
		
		$.mobile.pageContainer.append('<div data-role="page" id="SevenWondersScore">');
		
		$("#SevenWondersScore").html('<h1 data-role="header">7 Wonders - Results</h1>' +
				// How to get the BGG images sensisbly, is this okay from their TOS?
				'<table class="overview"><tr><td rowspan="4"><img src="http://cf.geekdo-images.com/images/pic860217_t.jpg" /></td>'+
				'<th>Game</th><td><a href="http://boardgamegeek.com/boardgame/68448/7-wonders">7 Wonders</a></td></tr>'+
				'<tr><th>Expansions</th><td>None</td></tr>'+
				'<tr><th>Players</th><td>'+data["players"].length+'</td></tr>'+
				'<tr><th>Winner</th><td>'+data["winner"]+' ('+data["winnerVP"]+'VP)</td></tr>'+
				'</table>'+
				'<table data-role="table" data-column-btn-theme="b" data-column-popup-theme="a" data-mode="columntoggle" class="table-stroke"><thead>' +
				'<tr class="th-groups"><td></td>'+
				'<th colspan="2" data-priority="1" class="totals">Ranking</th>'+
				'<th colspan="5" data-priority="2">Science</th>'+
				'<th colspan="2" data-priority="3">Gold</th>'+
				'<th colspan="4" data-priority="4">Other</th></tr>'+
				'<tr><th>Player</th><th>Rank</th><th>Total VP</th>' + fields +"</tr></thead>"+
				"<tbody id='summary'></tbody></table>");
		

		for (var idx in data["players"]) {
			var player = data["players"][idx];
			
			full_details = "<th>"+player["playerName"]+"</th><td>"+player["rank"]+"</td>" +
			"<td>"+player["totalVP"]+"</td>";
			
			for (x in displayFields) {
				var item = displayFields[x];
				var text = player[item];
				
				if (vpFields.indexOf(item) == -1) {
					text = "<i>"+text+"</i>"
				}
					
				full_details += "<td>"+text+"</td>";
			}
			
			$("#summary").append("<tr>"+full_details+"</tr>");
		}
		
		// Kick jquery mobile to create the relevant magic.
		$("#SevenWondersScore").trigger("create");
		$.mobile.changePage("#SevenWondersScore");
		
	};
	
	return SevenWonders;
	
});