var i = 0;
var delay = 0;
var rootTime = 0;

var buffer = [];

var playing = false;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();

var client = new BinaryClient('ws://localhost:9000');

client.on('stream', function(stream, meta) {

  stream.on('data', function(data) {
    buffer.push(data);

    // ctx.decodeAudioData(data, function(data) {
    //   buffer.push(data);
    // });
  });

  stream.on('end', main);
});

function main() {
  var channels = 2; // 1 - mono, 2 - setreo, 3 < multi channel
  var frequency = 44100;  // 44100 - standard
  var length = 10 * 60 * frequency; //min * sec * freq

  console.log(buffer);

  async.eachSeries(buffer, function(v, cb) {
    ctx.decodeAudioData(v, function(data) {

      var source = ctx.createBufferSource();
      source.buffer = data;
      source.connect(ctx.destination);
      source.start(0);

      setTimeout(function() {
        cb();
      }, v.duration * 1000);

    })
  });

}
