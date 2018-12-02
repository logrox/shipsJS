let express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(80);

app.use(express.static('client', {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});