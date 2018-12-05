let express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const ObjectClass = require('./server/models/Object.class');
const OwnerClass = require('./server/models/Owner.class');
const WeaponClass = require('./server/models/Weapon.class');
const FieldAreaClass = require('./server/models/FieldArea.class');

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
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});


const fieldAreaClass_1x1 = new FieldAreaClass();
const fieldAreaClass_1x2 = new FieldAreaClass();

let Gamer1 = new OwnerClass;
let Gamer2 = new OwnerClass;

const weaponClass_dzialo0 = new WeaponClass({
    cuirass: 11,
});

//-----------Pojazd 1
const objectClass_pojazd1 = new ObjectClass({
    owner: Gamer1,
    cuirass: 15
});

const indexWeapon = objectClass_pojazd1.addWeapon(weaponClass_dzialo0);
fieldAreaClass_1x1.addObject(objectClass_pojazd1);
//------------ Pojazd 2
const objectClass_pojazd2 = new ObjectClass({
    owner: Gamer2,
    cuirass: 10
});

objectClass_pojazd2.addWeapon(weaponClass_dzialo0);
fieldAreaClass_1x2.addObject(objectClass_pojazd2);
//-------------

const shot = objectClass_pojazd1.createShot(indexWeapon,fieldAreaClass_1x2);

//-------------

console.log('pojazd 1', fieldAreaClass_1x1.render(Gamer1));
console.log('pojazd 1', fieldAreaClass_1x1.render(Gamer2));

console.log('pojazd 2', fieldAreaClass_1x2.render(Gamer1));
console.log('pojazd 2', fieldAreaClass_1x2.render(Gamer2));








