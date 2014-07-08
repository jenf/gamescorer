
/* Boiler plate for require */
var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

fs = require("fs");

requirejs(["gamescorer"], function(gamescorer) {

	scorer = new gamescorer()
	
	data = fs.readFileSync(process.argv[2], "utf8");
	
	console.log(data);
	json = JSON.parse(data);
	
	
	
	dataout = scorer.score(json);
	
	console.log(JSON.stringify(dataout, null, " "));
	
	dataout = fs.readFileSync(process.argv[3],"utf8");
	jsonout = JSON.parse(dataout);

});