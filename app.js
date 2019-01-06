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

const apiArea = require('./server/api/area');

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
    //socket.emit('news', {hello: 'world connection'});
    socket.on('my other event', function (data) {
        console.log(49, data);
        socket.emit('area:get', [{test: "ups ok"}]);
        socket.emit('news', ["dzila"])
    });


});

const gameArea = new AreaClass(50, 50);

let Gamer1 = new OwnerClass({name: "Gamer1"});
let Gamer2 = new OwnerClass({name: "Gamer2"});
console.log(Gamer1.uuid);
console.log(Gamer2.uuid);
const gameClass = new GameClass({
    area: gameArea,
    owners: [Gamer1, Gamer2]
});
//--------------------

const F_0_0 = gameArea.getFieldAreaClass(15, 10);

const okret_1_1 = new ObjectClass({
    name: "Okręt 1-1",
    rangeView: 5,
    shield: 6,
    rangeMove: 2,
    owner: Gamer1
});

F_0_0.addObject(okret_1_1);

//---------------

const F_0_4 = gameArea.getFieldAreaClass(18, 14);

const w_2_1 = new WeaponClass({
    owner: Gamer2,
    shield: 5,
    rangeAttack: 5
});
w_2_1.setMagazine(1);

const okret_2_1 = new ObjectClass({
    name: "Okręt 2-1",
    rangeView: 3,
    rangeMove: 2,
    maxWeapons: 1,
    owner: Gamer2
});

const wIndex = okret_2_1.addWeapon(w_2_1);

const smoke = new SmokescreenClass({
    lifeCircle: 1,
    owner: Gamer2
});


F_0_4.addObject(okret_2_1);
F_0_4.addModifier(smoke);

//------------------------


gameClass.lifeCircle(Gamer1);
gameClass.action_move(okret_1_1, 0, 2);

gameClass.lifeCircle(Gamer2);
gameClass.action_move(okret_2_1, 0, 7);

gameClass.lifeCircle(Gamer1);
gameClass.action_move(okret_1_1, 0, 3);

gameClass.lifeCircle(Gamer2);
gameClass.action_shot(okret_2_1, wIndex, 0, 3);

// const renderGamer1 = gameClass.render(Gamer1);
 const renderGamer2 = gameClass.render(Gamer2);


const area = new apiArea({
    io,
    gameClass,
    prefix: 'game'
});

/*

* Tworzenia usera
- Login + Klucz = token
+ ten token jest zawsze odzysłany jesli sachodzi jakaś akcja bo jest to identyfikator
- Nadawawnie nazwy

* Przystąpienie do gry
+ Odbywa się to na zazadzie już otwartej gry w ramach 1 servera, on po starcie czeka na 2 do 4 graczy
+ jeśli bedzie 2 - 4 pokazue się przycisk start, blokowane jest dodanie kolejnego gracza.

* Zwrócenie Areny z domyslnie ustawionymi statkami "Baza"
+ Każdy gracz dostaję kasę około 100zł
+ za złoto można kupować (do 4 statków, bronie dla statków, ulepszenia broni, ulepszenia statków, miny, zasłony dymne)

* Rozpoczęcie tury (1 tura = wykonanie wszystkich akcji przez gracza * ilość graczy)
+ W ramach tury gracz ma tyle akcji ile statków (max 4) w ramach akcji może (kupić, ulepszyć, postawić, ostrzelać)
+ Każdy ruch i tylko ruch przynosi zysk 1zł

/////////
Każda akcja jest odsyłana przez WS obsługiwana przez server i rozsyłana graczom
////////

Ruch - Urzytkownik wybiera statek z listy dostepnych statków ( lub z mapy ) i wskazuje na mapie miejsce gdzie chce go przemieścić
+ Statki mają okresloną liczbe pul jaką moga sie przemieścić w ramach 1 akcji, oznacza to tyle że jesli statek ma maksymalny dystanas np.3 pola to nie porusza sią on kolejno po 3 kolejnych polach
+ tylko odrazu przeskakuje na wskazane pole "tak jak w grze z kostą".
+ Po wskazaniu pola na jakie ma zostać przeniesiony okręt akcja jest weryfikowana przez server a ten odsyła aktualny stan statku
( do gracza trafiają "logi" co się stało, bo na polu mogła być mina i gracz dostał obrarzenia lub został zniszczony
 mógł też się znajdować okręt wroga i akcja została wycofana, a zasłona dymna usunięta z gracza)

Kupowanie/Ulepszanie - Urzytkownik wybiera statek/bazę i ze Sklepu klikająć kup dokonuje zakupu/ulepszenia 1 przedmiotu w ramach 1 akcji.

Strzelanie/Ustawianie - Urzytkownik klika na statek i z dostępnego ekwipunku wybiera broń/minę/zasłone następnie klika wykonaj i wybiera obszar do wykonania wybranej akcji.



WS:

<- /manager#addUser - dodawanie usera do gry
<- /manager#runGame - Rozpoczynanie Gry

<- /game#action?type&payload - Wykonywanie akcji    

<- /game#action?type=bay&payload - Kupowanie        
<- /game#action?type=update&payload - Ulepszenie    
<- /game#action?type=move&object=@id@?x?y - Ruch
<- /game#action?type=shot?object=@id@weapon=@id@?x?y - Strzał
<- /game#action?type=mine?object=@id@mine=@id@?x?y - Ustawienie miny
<- /game#action?type=smoke?object=@id@smoke=@id@?x?y - ustawienie zaslony dymnej

-> /game#action?type=render&payload - Zwraca każdemu userowi dane do aktualozacji obszarów/obiektów/modyfikatorów

<-> /game#check?type=filed?x?y - Zwraca informacje z podanych kordynatów (obiekt na polu,mina/zasłona dymna)

*/




