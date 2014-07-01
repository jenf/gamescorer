fs = require("fs");
gamescorer = require("./gamescorer.js");

data = fs.readFileSync(process.argv[2], "utf8");

console.log(data);
json = JSON.parse(data);
dataout = gamescorer.score(json);

console.log(JSON.stringify(dataout, null, " "));

dataout = fs.readFileSync(process.argv[3],"utf8");
jsonout = JSON.parse(dataout);
