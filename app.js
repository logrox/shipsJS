let express = require('express');
const app = express();
const uuid = require('./server/helpers/uuid')
const server = require('http').Server(app);
const io = require('socket.io')(server);

// const ObjectClass = require('./server/models/Object.class');
// const OwnerClass = require('./server/models/Owner.class');
// const WeaponClass = require('./server/models/Weapon.class');
// const FieldAreaClass = require('./server/models/FieldArea.class');
// const {BombClass, SmokescreenClass} = require('./server/models/Modifier.class');
// const AreaClass = require('./server/models/Area.class');
// const GameClass = require('./server/models/Game.class');
const Engine = require('./server/engine/Engine');


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

io.use((socket, next) => {
    //todo tu sprawdzic czy istnieje sesja
    console.log('todo tu sprawdzic czy istnieje sesja');

    next();
});


const sessionIDs = new Map();

let engine = new Engine({
    serverIo: io,
});

io.on('connection', function (client) {
    let sessionUuid = null;
    let user = null;

    client.use(function (payload, next) {
        if (sessionUuid === null || user === null) {
            next();
            return void 0;
        }

        payload.push({userUuid: user.userUuid});
        next();

    });


    client.on('authorization', function (payload, callback) {
        console.log(payload);
        if (payload.sessionUuid) {
            const founding = Array.from(sessionIDs.keys()).find(value => value.sessionUuid === payload.sessionUuid);
            if (founding) {
                sessionUuid = founding.sessionUuid;
                user = sessionIDs.get(founding);
                engine.reConnect({
                    key: sessionUuid,
                    clientIo: client
                });
                callback({
                    sessionUuid: founding.sessionUuid
                });
            } else {
                callback({
                    sessionUuid: null
                });
            }
        } else if (payload.username && payload.key) {

            let key = `${payload.username}@${payload.key}`;

            const founding = Array.from(sessionIDs.keys()).find(value => value.user === key);
            if (founding) {
                sessionUuid = founding.sessionUuid;
                user = sessionIDs.get(founding);

                engine.reConnect({
                    key: sessionUuid,
                    clientIo: client
                });

                callback({
                    sessionUuid: founding.sessionUuid
                });
            } else {


                const userStorage = {
                    userUuid: null
                };
                sessionUuid = uuid();

                user = userStorage;

                sessionIDs.set({
                    user: `${payload.username}@${payload.key}`,
                    sessionUuid
                }, userStorage);


                userStorage.userUuid = engine.addConnection({
                    key: sessionUuid,
                    clientIo: client
                });

                callback({sessionUuid});
            }

        }

    });

});


//F_0_4.addModifier(smoke);

//------------------------


// gameClass.lifeCircle(Gamer1);
//gameClass.action_move(okret_1_1, 0, 2);
//
// gameClass.lifeCircle(Gamer2);
// gameClass.action_move(okret_2_1, 0, 7);
//
// gameClass.lifeCircle(Gamer1);
// gameClass.action_move(okret_1_1, 0, 3);
//
// gameClass.lifeCircle(Gamer2);
// gameClass.action_shot(okret_2_1, wIndex, 0, 3);

// const renderGamer1 = gameClass.render(Gamer1);


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




