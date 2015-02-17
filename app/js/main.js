var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();

var socket = io('localhost:8080');

function echo(d) {
  console.log(d)
}

function play(raw) {
  ctx.decodeAudioData(raw, function(data) {
    var source = ctx.createBufferSource();
    source.buffer = data;
    console.log(data);
    source.connect(ctx.destination);
    source.start(delay);
    delay += data.duration;
  })
}

var buffer = [];
var delay = 0;

socket.on('start', echo);
socket.on('packet', function(packet) {
  buffer.push(packet);
  play(packet);
});

socket.on('end', function() {
  async.eachSeries(buffer, function(v, cb) {
    console.log(v);
    play(v);
  })
});
