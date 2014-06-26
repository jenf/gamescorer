fs = require("fs");
gamescorer = require("./gamescorer.js");

Object.prototype.deepEquals = function(x)
{
  var p;
  for(p in this) {
      if(typeof(x[p])=='undefined') {return false;}
  }

  for(p in this) {
      if (this[p]) {
          switch(typeof(this[p])) {
              case 'object':
                  if (!this[p].deepEquals(x[p])) { return false; } break;
              case 'function':
                  if (typeof(x[p])=='undefined' ||
                      (p != 'equals' && this[p].toString() != x[p].toString()))
                      return false;
                  break;
              default:
                  if (this[p] != x[p]) { return false; }
          }
      } else {
          if (x[p])
              return false;
      }
  }

  for(p in x) {
      if(typeof(this[p])=='undefined') {return false;}
  }

  return true;
}


data = fs.readFileSync(process.argv[2], "utf8");

console.log(data);
json = JSON.parse(data);
dataout = gamescorer.score(json);

console.log(JSON.stringify(dataout, null, " "));

dataout = fs.readFileSync(process.argv[3],"utf8");
jsonout = JSON.parse(dataout);

console.log(jsonout.deepEquals(json));
