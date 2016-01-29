# AIFF File Info for Node.JS
#### A lightweight module that parses AIFF information data from a AIFF file into a Javascript Object. Basically retrieves file and header meta data information from a AIFF file.  Note that this module currently does not parse AIFC files

### Used for:
- Determining the validity of a .aif file
- Detecting the bit depth / bit rate / bits per sample of a .aif file
- Detecting the Sample Rate of a .aif file
- Detecting the number of channels in a .aif file
- Retrieving the file information, including file size, created date etc


### Usage

```
npm install aiff-file-info --save
```

```javascript
var wavFileInfo = require('aiff-file-info');

wavFileInfo.infoByFilename('./test.aif', function(err, info){
  if (err) throw err;
  console.log(info);
});
```
#### if `err` is not null, the AIFF file is valid.






### Result

```
{ header:
   { form_identifier: 'FORM',
     chunk_size: 1462318,
     aiff_identifier: 'AIFF',
     comm_identifier: 'COMM',
     chunk_length: 18,
     num_channels: 1,
     num_sample_frames: 487424,
     bits_per_sample: 24,
     sample_rate: 96000 },
  stats:
   { dev: 16777220,
     mode: 33188,
     nlink: 1,
     uid: 501,
     gid: 20,
     rdev: 0,
     blksize: 4096,
     ino: 103575654,
     size: 1462326,
     blocks: 2864,
     atime: Thu Jan 28 2016 18:28:43 GMT-0700 (MST),
     mtime: Thu Jan 28 2016 15:52:09 GMT-0700 (MST),
     ctime: Thu Jan 28 2016 15:52:09 GMT-0700 (MST),
     birthtime: Thu Jan 28 2016 15:52:01 GMT-0700 (MST) },
  duration: 5.077493055555555 }
```

### Example errors

```
{ error: true,
  invalid_reasons: [ 'Expected "AIFF" string', 'Expected "COMM" string' ]
}
```

Duration is in seconds.  Stats come from Node raw fs.statSync() result.

References:


 TODO: Deep scan [avg amplitude, max amplitude], fork for AIFC



Resources used:
AIFF (Audio Interchange File Format) / AIF file information helper


https://cycling74.com/forums/topic/aiffs-80-bit-sample-rate-value/

http://www.instructables.com/id/How-to-Read-aiff-Files-using-C/

http://www.muratnkonar.com/aiff/

http://www-mmsp.ece.mcgill.ca/documents/audioformats/aiff/aiff.html

http://aifftools.sourceforge.net/libaiff/#aiff

http://download.banshee.fm/taglib-sharp/2.1.0.0/


http://www.muratnkonar.com/aiff/

MIME
http://www.digitalpreservation.gov/formats/fdd/fdd000005.shtml

http://web.mit.edu/jhawk/mnt/spo/gnome/old-and-dead/src/gnome-1.0/audiofile-0.1.6/libaudiofile/aiff.c

https://github.com/taglib/taglib/tree/master/taglib/riff/aiff

https://godoc.org/github.com/mattetti/audio/aiff

http://www.cs.columbia.edu/~hgs/software/tsip/tel-sip/aiff.c
