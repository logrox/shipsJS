let express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const ObjectClass = require('./server/models/Object.class');
const OwnerClass = require('./server/models/Owner.class');
const WeaponClass = require('./server/models/Weapon.class');
const FieldAreaClass = require('./server/models/FieldArea.class');
const {BombClass, SmokescreenClass} = require('./server/models/Modifier.class');
const AreaClass = require('./server/models/Area.class');
const GameClass = require('./server/models/Game.class');

const Area = require('./server/api/area');

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

const gameSocket = io.of('game');
gameSocket.on('connect', (socket) => {
    //socket.emit('area:get', {hello: 'world game'});
    socket.on('area', function (data) {
        console.log('test');
        let method1 = data.method.toString().toLowerCase();
        Area[method1](data.payload).then(value => {
            socket.emit(`area:${data.method}`, value);
        })
    });
});


io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world connection'});
    socket.on('my other event', function (data) {
        console.log(49, data);
        socket.emit('news', ["dzila"])
    });


});

const gameArea = new AreaClass(10, 10);

let Gamer1 = new OwnerClass({name: "Gamer1"});
let Gamer2 = new OwnerClass({name: "Gamer2"});

const gameClass = new GameClass({
    area: gameArea,
    owners: [Gamer1, Gamer2]
});

//--------------------

const F_0_0 = gameArea.getFieldAreaClass(0, 1);

const okret_1_1 = new ObjectClass({
    name: "Okręt 1-1",
    rangeView: 5,
    owner: Gamer1
});

F_0_0.addObject(okret_1_1);

//---------------

const F_0_4 = gameArea.getFieldAreaClass(0, 4);

const okret_2_1 = new ObjectClass({
    name: "Okręt 2-1",
    rangeView: 5,
    owner: Gamer2
});
const smoke = new SmokescreenClass({
    lifeCircle: 1,
    owner: Gamer2
});


F_0_4.addObject(okret_2_1);
F_0_4.addModifier(smoke);

//------------------------


gameClass.lifeCircle(Gamer1);
gameClass.lifeCircle(Gamer2);
gameClass.lifeCircle(Gamer1);
// gameClass.lifeCircle(Gamer2);

const renderGamer1 = gameClass.render(Gamer1);

console.log(renderGamer1);










