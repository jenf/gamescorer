fs = require("fs");
gamescorer = require("./gamescorer.js");

fs.readFile(process.argv[2], "utf8", function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  json = JSON.parse(data);
  dataout = gamescorer.score(json);
  console.log(JSON.stringify(dataout, null, " "));
});
