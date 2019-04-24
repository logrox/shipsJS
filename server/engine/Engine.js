const AreaClass = require('../models/Area.class');
const GameClass = require('../models/Game.class');

const Client = require('./Client');

const gameArea = new AreaClass(50, 50);


const gameClass = new GameClass({
    area: gameArea,
    owners: []
});

class Engine {

    constructor(props) {
        this.__serverIo = props.serverIo;
        this.__controllLifeCircle = [];
        this.__clients = new Map();
    }

    reConnect({key, clientIo}) {
        const __clients = this.__clients.get(key);
        if (__clients) {

            __clients.client.setNewIo(clientIo);
            return true;

        }

        return false
    }


    addConnection({key, clientIo}) {
        const size = this.__clients.size;

        const client = new Client({
            gameClass,
            clientIo,
            count: size
        });

        this.__clients.set(key, {
            client
        });

        if (this.__clients.size === 2) {

            //todo dodac timeout na 3000
            setTimeout(() => {
                let first = null;
                this.__clients.forEach((map_client, key) => {
                    if (!first) {
                        first = map_client;
                    }
                    this.__controllLifeCircle.push(map_client.client._owner.uuid);
                    map_client.client.startGame();
                });
                first.client._owner.lifeCircle(first.client._owner);
            }, 3000)

        }
        client.nextLifeCircleOwner = (keyToRemove) => {

            const indexOf = this.__controllLifeCircle.indexOf(keyToRemove);
            if (~indexOf) {
                this.__controllLifeCircle.splice(indexOf, 1);
            }
            if(this.__controllLifeCircle.length !== 0){
                const uuid = this.__controllLifeCircle[0];
                let findClient = null;
                this.__clients.forEach(map_client => {
                    if(map_client.client._owner.uuid === uuid){
                        findClient = map_client.client;
                    }
                });
                findClient && findClient._owner.lifeCircle(findClient._owner);
            }else {
                let first = null;
                this.__clients.forEach((map_client, key) => {
                    if (!first) {
                        first = map_client;
                    }
                    this.__controllLifeCircle.push(map_client.client._owner.uuid);
                });
                first.client._owner.lifeCircle(first.client._owner);
            }
            console.log(this.__controllLifeCircle)
        };

        client.emitAllUpdateArea = () => {
            this.__clients.forEach((value, key1) => {
                value.client.onUpdateArea();
            })
        };

        return client.getOwnerUuid();
    }

    removeConnection(key) {
        this.__clients.delete(key);
    }

}

module.exports = Engine;