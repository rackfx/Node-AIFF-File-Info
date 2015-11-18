var afi = require('./aif-file-info');

afi.infoByFilename('test/Zeno-MutaraNebula_wSamples_MAS.aif', function(err, info){
//afi.infoByFilename('test/M1F1-int24-AFsp.aif', function(err, info){
  console.log(err,info);
})
