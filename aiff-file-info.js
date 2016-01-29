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
      ['chunk_length', 'uinteger', 4],

      ['num_channels', 'uinteger',2],
      ['num_sample_frames', 'uinteger', 4],
      ['bits_per_sample','uinteger',2],
      ['sample_rate1','uinteger',2],
      ['sample_rate2','uinteger',1],
      ['sample_rate3','uinteger',1],



    ]

    fs.read(fd,buffer,0,80,0,function(err,num){
      var i=0;
      var pointer = 0;
      //console.log(buffertools.indexOf(buffer,"ND",0))
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

         delete read_result.sample_rate1;
         delete read_result.sample_rate2;
         delete read_result.sample_rate3;

         var error = false;
         var invalid_reasons = []

         if(read_result.form_identifier != "FORM") invalid_reasons.push("Expected \"FORM\" string at 0")
         if(read_result.aiff_identifier != "AIFF") invalid_reasons.push("Expected \"AIFF\" string")
         if(read_result.comm_identifier != "COMM") invalid_reasons.push("Expected \"COMM\" string")

         if (invalid_reasons.length > 0) error = true;

         if (error) return cb({
            error : true,
            invalid_reasons: invalid_reasons,
            header: read_result,
            stats: stats
          });
          cb(null, {
            header: read_result,
            stats: stats,
            duration: ((read_result.chunk_size) / (read_result.sample_rate * read_result.num_channels * (read_result.bits_per_sample / 8)))
          });
       }

    })


  })
}

module.exports = afi;
