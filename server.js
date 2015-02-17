var fs = require('fs');
var io = require('socket.io')(8080);

var express = require('express');
var app = express();

app.use('/vendor', express.static(__dirname + '/vendor'));
app.use(express.static(__dirname + '/app'));

app.get('/file', function(req, res) {
  var file = fs.createReadStream(__dirname + '/audio/02_Ghosts_I.ogg');
  file.on('open', function() {
    file.pipe(res);
  });
})

io.on('connection', function(socket) {
  var file = fs.createReadStream(__dirname + '/audio/02_Ghosts_I.mp3');
  file.on('data', function(data){
    socket.emit('packet', data);
  });
});

app.listen(80);
