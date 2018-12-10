let express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const ObjectClass = require('./server/models/Object.class');
const OwnerClass = require('./server/models/Owner.class');
const WeaponClass = require('./server/models/Weapon.class');
const FieldAreaClass = require('./server/models/FieldArea.class');
const {BombClass, SmokescreenClass} = require('./server/models/Modifier.class');
const AreaClass = require('./server/models/Area.class');

//server.listen(80);

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

const gameArea = new AreaClass(10, 10);

const fieldAreaClass_1x1 = gameArea.getFieldAreaClass(0, 1);
const fieldAreaClass_1x2 = gameArea.getFieldAreaClass(0, 3);

let Gamer1 = new OwnerClass({name: "Gamer1"});
let Gamer2 = new OwnerClass({name: "Gamer2"});

const weaponClass_dzialo0 = new WeaponClass({
    shield: 3,
    rangeAttack:4,
    maxMagazine:3,
});

//-----------Pojazd 1
const objectClass_pojazd1 = new ObjectClass({
    owner: Gamer1,
    cuirass: 15,
    name: "Pojazd gracza 1",
});

const bomb0 = new BombClass({
    owner: Gamer1,
    cuirass: 5,
});

const smokescreenClass0 = new SmokescreenClass({
    owner: Gamer1,
    lifeCircle: 2
});

weaponClass_dzialo0.setMagazine(20);
console.log(weaponClass_dzialo0.getMagazine());


const indexWeapon = objectClass_pojazd1.addWeapon(weaponClass_dzialo0);
fieldAreaClass_1x1.addObject(objectClass_pojazd1);
//fieldAreaClass_1x1.addModifier(smokescreenClass0);


//------------ Pojazd 2
const objectClass_pojazd2 = new ObjectClass({
    owner: Gamer2,
    cuirass: 5,
    shield: 5,
    name: "Pojazd gracza 2",
});

// objectClass_pojazd2.addWeapon(weaponClass_dzialo0);
fieldAreaClass_1x2.addObject(objectClass_pojazd2);
//-------------


// if (gameArea.getFieldAreaClass(0, 1).addModifier(bomb0)) {
//     console.log('udalo sie dodac bombe na pole gracza')
// } else {
//     console.log('Blad dodawania bomby')
// }


//-------------

function run() {

    const hit = objectClass_pojazd1.createShot(indexWeapon, fieldAreaClass_1x2);
    console.log("hit1:", hit);

    const hit2 = objectClass_pojazd1.createShot(indexWeapon, fieldAreaClass_1x2);
    console.log("hit2:", hit2);

    const hit3 = objectClass_pojazd1.createShot(indexWeapon, fieldAreaClass_1x2);
    console.log("hit3:", hit3);

    const hit4 = objectClass_pojazd1.createShot(indexWeapon, fieldAreaClass_1x2);
    console.log("hit3:", hit4);

    fieldAreaClass_1x1.lifeCircle(Gamer1);



    const render = {
        // 'pole 1 - gracz 1': fieldAreaClass_1x1.render(Gamer1),
        // 'pole 1 - gracz 2': fieldAreaClass_1x1.render(Gamer2),

        // 'pole 2 - gracz 1': fieldAreaClass_1x2.render(Gamer1),
        'pole 2 - gracz 2': fieldAreaClass_1x2.render(Gamer2),
    };

    console.log(render);
}

// setTimeout(() => {
    run();
// }, 2000)










