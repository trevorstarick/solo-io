var client = new BinaryClient('ws://localhost:9000');

var ctx;
var source;
var block = [];

window.addEventListener('load', init, false);

function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();
  } catch (e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function stop() {
  clearInterval(loop);
}

client.on('stream', function(stream, meta) {
  var worker = new Worker("js/worker.js");
  var workerPrime = new Worker("js/worker.js");

  stream.on('data', function(data) {
    block.push(data);
  });

  stream.on('end', function() {
    var delay = 0;
    var i = 0;
    window.loop = setInterval(function() {
      console.log(i);

      if(i > block.length) {
        stop();
      }

      delay = 5000;

      ctx.decodeAudioData(block[i], function(data) {
        source = ctx.createBufferSource();
        source.connect(ctx.destination);
        source.buffer = data;
        source.start();
      });

      i+=1;
    }, delay);

  })
});
