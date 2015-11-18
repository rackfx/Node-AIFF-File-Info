//Hi, AFI by David Jones / RackFX, LLC
var buffertools = require('buffertools');
var fs = require('fs');
var afi = {};

afi.infoByFilename = function(filename, cb){
  var stats = fs.statSync(filename);
  var buffer = new Buffer(160);

  fs.open(filename, 'r', function(err, fd){
    if (err) return cb(err);

    var read_result = {}
    var reads = [
      ['form_identifier', 'string', 4],
      ['chunk_size', 'uinteger', 4],
      ['aiff_identifier', 'string',4],
      ['comm_identifier', 'string', 4],
      ['what','integer',4],
      ['hi','integer',4],
      ['w','integer',4],
      ['a','integer',4],
      ['x','integer',4],
      ['zz','integer',4],
      ['fda','integer',4],
      ['h3i','integer',4],
      ['w3','integer',4],
      ['a3','integer',4],
      ['x3','integer',4],
      ['zz3','integer',4],
      ['fda3','integer',4],
    ]

    fs.read(fd,buffer,0,40,0,function(err,num){
      var i=0;
      var pointer = 0;
      console.log(buffertools.indexOf(buffer,"COMM",0))
      function read_aif(){
        var read = reads[i];

        i++;
        if(read[1]=='string'){
          read_result[read[0]] = buffer.toString('ascii', pointer , pointer + read[2]);
          pointer = pointer + read[2];   // pointer = pointer plus # bytes
        }
        else if(read[1]=='integer'){
          read_result[read[0]] = buffer.readUIntLE(pointer, read[2])
          pointer = pointer + read[2];
        }
        else if(read[1]=='uinteger'){
          read_result[read[0]] = buffer.readUIntBE(pointer, read[2])
          pointer = pointer + read[2];
        }
        if(i < reads.length) { return read_aif()}
        else { return post_process(); }

      }

       read_aif();

       function post_process(){
         console.log(read_result);
       }

    })


  })
}

module.exports = afi;
