define("GameCommon", function () {

	function GameCommon() {}
	
	GameCommon.prototype.calculateWinnerHighScore = function(data) {
	    var highest = null;
	    
	    var scores = data["players"].slice(0);
	    
	    scores.sort (function (a,b) {
	    	return b["totalVP"] - a["totalVP"];
	    });
	    
	    data["winner"]=scores[0]["playerName"];
	    data["winnerVP"]=scores[0]["totalVP"];
	    
	    for (var idx in scores) {
	    	scores[idx]["rank"]=1 + +idx; // Start at 1... somehow idx is a string...
	    }	    

	}
	
	GameCommon.prototype.setData = function(data) {
		this.data = data;
	}
	GameCommon.prototype.calculateScoreFromVP = function(player, items) {
	    var totalVP = 0;
	    for (var item in items) {
	        totalVP += player[items[item]];
	    }
	    
	    player["totalVP"]= totalVP;
	    
	    return totalVP;
	}
	
	
	GameCommon.prototype.askQuestion = function(elem) {
		
		var so = this;
		var query = this.questions[elem];
		var filled = true;
		
		/* Check if the element is already filled in */
		for (var idx in this.data.players) {
			var item = this.data.players[idx];
			
			if (!(elem in item)) {
				filled = false;
				break;
			}
		}
			
		if (filled == false) {
			console.log("Entering "+elem);
			var id = so.json_name+"_"+elem;
			
			$.mobile.pageContainer.append('<div data-role="page" id="'+id+'">'+
					'<div data-role="header"><h1>'+so.name+":"+so.english[elem]+'</h1></div>'+
					'<div role="main" class="ui-content"><form class="entryPageForm"><h1>'+query.description+'</h1></form></div></div>');
			
			if (query.method=="number") {
				for (var idx in this.data.players) {
					var item = this.data.players[idx];
					
					var value= 0;
					if (elem in item) {
						value = item[elem];
					}
					
					$("#"+id+' .entryPageForm').append(
							'<label for="'+idx+'">'+item["playerName"]+':</label>'+
							'<input name="'+idx+'" pattern="[0-9]*" min="0" id="number'+idx+'" value="'+value+'" type="number" required>');
				}
			}

			$("#"+id+' .entryPageForm').append(
					'<input value="Submit" type="submit">'
					)
					
			$("#"+id+' .entryPageForm').validate({submitHandler: function(form) {
					/* Insert data and move to next page */
					
					for (var idx in so.data.players) {
						// This violates id....
						var newvalue = $("#"+id+" #number"+idx)[0].valueAsNumber;
						var item = so.data.players[idx];
						
						item[elem] = newvalue;
					}
					console.log(so.data);
					so.showUI();
				}
			});
			
			// Kick jquery mobile to create the relevant magic.
			$('#'+id).trigger("create");
			$.mobile.changePage('#'+id);
			return elem;
		}
		
		// This entry is okay, continue!
		return query.next;
		
	}
	
	GameCommon.prototype.showUI = function() {
		/* Work out how far along the questions */
		
		if (!("players" in this.data)) {
			// TODO: This will actually ask questions
			this.data["players"] = [{"playerName":"Player 1"},{"playerName":"Player 2"}];
		}
		
		/* Jump down the decision tree, this may seem inefficient but it may help resume scoring later in development. */
		var elem = this.questions_start;
		
		while (elem) {


			var newelem = this.askQuestion(elem);
			if (newelem == elem) {
				// we're being displayed
				break;
			}
			
			if (!newelem) {
				// No more questions!
				this.score();
				this.showScore();
				break;
			}
			
			elem = newelem;
		}
	}
	
	return GameCommon;

});