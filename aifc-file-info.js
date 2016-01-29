//Hi, AFI by David Jones / RackFX, LLC
var buffertools = require('buffertools');
var fs = require('fs');
var afi = {};
console.log('---')
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
      ['chunk_length', 'uinteger', 4],

      ['num_channels', 'uinteger',1],
      ['num_sample_frames', 'uinteger', 1],
      ['sample_size','uinteger',2],
      ['sample_rate1','uinteger',2],
      ['sample_rate2','uinteger',1],
      ['sample_rate3','uinteger',1],



    ]

    fs.read(fd,buffer,0,80,0,function(err,num){
      var i=0;
      var pointer = 0;
      console.log(buffertools.indexOf(buffer,"ND",0))
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
        else if(read[1]=='extendfloat'){
          read_result[read[0]] = buffer.toString('ascii', pointer , pointer + read[2]);
          pointer = pointer + read[2];
        }
        if(i < reads.length) { return read_aif()}
        else { return post_process(); }

      }

       read_aif();

       function post_process(){
         var pad = read_result.sample_rate1 - 16398;
         var shifted = (read_result.sample_rate2<<8) + read_result.sample_rate3 ;
         read_result.sample_rate = shifted << pad;
        //  read_result.pad = pad;
        //  read_result.shifted = shifted;


         console.log(cb(null,read_result));
       }

    })


  })
}

module.exports = afi;
