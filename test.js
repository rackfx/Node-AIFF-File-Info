var afi = require('./aiff-file-info');

var a = [
  'test/brendabitches.aif',
  'test/ableton.aif',
  'test/ableton96.aif',

]



i=0;

function go(){
  console.log(i, a[i])
  afi.infoByFilename(a[i], function(err, info){
    console.log('>',err,info);
    i++;
    console.log('------')
    if(i < a.length) go();
  });
}

go();
