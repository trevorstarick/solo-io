var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var http2 = require('http2');
var _ = require('lodash');

var express = require('express');
var hbs = require('express-hbs');


var options = {
  key: fs.readFileSync(path.join(__dirname, '/ssl/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '/ssl/server.crt'))
};


var flatColors = [
  "D24D57",
  "F22613",
  "D91E18",
  "96281B",
  "EF4836",
  "D64541",
  "C0392B",
  "CF000F",
  "E74C3C",
  "DB0A5B",
  "F64747",
  "F1A9A0",
  "D2527F",
  "E08283",
  "F62459",
  "E26A6A",
  "DCC6E0",
  "663399",
  "674172",
  "AEA8D3",
  "913D88",
  "9A12B3",
  "BF55EC",
  "BE90D4",
  "8E44AD",
  "9B59B6",
  "446CB3",
  "E4F1FE",
  "4183D7",
  "59ABE3",
  "81CFE0",
  "52B3D9",
  "C5EFF7",
  "22A7F0",
  "3498DB",
  "2C3E50",
  "19B5FE",
  "336E7B",
  "22313F",
  "6BB9F0",
  "1E8BC3",
  "3A539B",
  "34495E",
  "67809F",
  "2574A9",
  "1F3A93",
  "89C4F4",
  "4B77BE",
  "5C97BF",
  "4ECDC4",
  "A2DED0",
  "87D37C",
  "90C695",
  "26A65B",
  "03C9A9",
  "68C3A3",
  "65C6BB",
  "1BBC9B",
  "1BA39C",
  "66CC99",
  "36D7B7",
  "C8F7C5",
  "86E2D5",
  "2ECC71",
  "16a085",
  "3FC380",
  "019875",
  "03A678",
  "4DAF7C",
  "2ABB9B",
  "00B16A",
  "1E824C",
  "049372",
  "26C281",
  "F5D76E",
  "F7CA18",
  "F4D03F",
  "FDE3A7",
  "F89406",
  "EB9532",
  "E87E04",
  "F4B350",
  "F2784B",
  "EB974E",
  "F5AB35",
  "D35400",
  "F39C12",
  "F9690E",
  "F9BF3B",
  "F27935",
  "E67E22",
  "ececec",
  "6C7A89",
  "D2D7D3",
  "EEEEEE",
  "BDC3C7",
  "ECF0F1",
  "95A5A6",
  "DADFE1",
  "ABB7B7",
  "F2F1EF",
  "BFBFBF",
];

function pickFlatColor() {
  return _.sample(flatColors);
}

var albumArt = [
  'http://i.imgur.com/YY3bLP7.jpg',
  'http://i.imgur.com/9lDdLYR.jpg',
  'http://i.imgur.com/fYYulaI.jpg'
]

function pickAlbumArt() {
  return _.sample(albumArt);
}

var app = express();

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/app/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/views');

app.use('/vendor', express.static(__dirname + '/vendor'));

app.use('/audio', express.static(__dirname + '/audio'));
app.use('/music', express.static(__dirname + '/audio'));
app.use('/sound', express.static(__dirname + '/audio'));

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.render('index', {
    color: pickFlatColor(),
    image: pickAlbumArt()
  })
})

app.get('/file', function(req, res) {
  var file = fs.createReadStream(__dirname + '/audio/02_Ghosts_I_320kb.mp3');
  file.on('open', function() {
    file.pipe(res);
  });
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
// http2.createServer(options, app).listen(443);
