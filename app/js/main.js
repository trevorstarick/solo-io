var i = 0;
var delay = 0;
var rootTime = 0;

var block = [];
var blockprime = [];

var prime = false;
var playing = false;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();

var client = new BinaryClient('ws://localhost:9000');

client.on('stream', function(stream, meta) {

  stream.on('data', function(data) {
    if (prime) {
      blockprime.push(data);
      prime = false;
    } else {
      block.push(data);
      prime = true;
    }
    if(!playing) {
      playback(0, 0);
      playing = true;
    }
  });

});


function playback(i, timeout) {
  console.log('+', i, timeout);
  setTimeout(function() {
    ctx.decodeAudioData(block[i], function(data) {
      source = ctx.createBufferSource();
      source.connect(ctx.destination);
      source.buffer = data;
      source.start(0);
      playbackprime(i, data.duration);
    });
  }, timeout * 988);
}

function playbackprime(i, timeout) {
  console.log('-', i, timeout);
  setTimeout(function() {
    ctx.decodeAudioData(blockprime[i], function(data) {
      source = ctx.createBufferSource();
      source.connect(ctx.destination);
      source.buffer = data;
      source.start(0);
      playback(i + 1, data.duration);
    });
  }, timeout * 988);
}
