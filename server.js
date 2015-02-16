var fs = require('fs');

var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;

var app = express();
var server = BinaryServer({port: 9000});

app.use('/vendor', express.static(__dirname + '/vendor'));
app.use(express.static(__dirname + '/app'));

server.on('connection', function(client) {
  // fs.readdir(__dirname + '/data/', function(err, files) {
  //   files.forEach(function(value, index, array) {
  //       var file = fs.createReadStream(__dirname + '/data/' + value);
  //       if(index < limit) {
  //         client.send(file);
  //       }
  //   });
  // });
  var file = fs.createReadStream(__dirname + '/example.mp3');
  var stream = client.createStream();
  file.pipe(stream);
})


app.listen(80);
