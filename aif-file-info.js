//Hi, AFI by David Jones / RackFX, LLC

var fs = require('fs');
var afi = {};

afi.infoByFilename = function(filename, cb){
  var stats = fs.statSync(filename);
  var buffer = new Buffer(40);
  fs.open(filename, 'r', function(err, fd){
    if (err) return cb(err);
  })
}
