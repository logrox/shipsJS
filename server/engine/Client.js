const OwnerClass = require('../models/Owner.class');
const ObjectClass = require('../models/Object.class');

const apiArea = require('../api/area');
const apiObject = require('../api/object');


class Client {

    constructor(props) {
        this.__io = props.clientIo;
        this.__gameClass = props.gameClass;
        this.__apiArea = null;

        this._owner = new OwnerClass({name: "Gamer1"});
        const object = new ObjectClass({
            name: "Okręt",
            rangeView: 5,
            shield: 6,
            rangeMove: 2,
            owner: this._owner
        });
        let field = null;
        const gameArea = props.gameClass.getArea();

        switch (props.count) {
            case 0: {
                field = gameArea.getFieldAreaClass(0, 0);
                break
            }
            case 1: {
                field = gameArea.getFieldAreaClass(49, 0);
                break
            }
            case 2: {
                field = gameArea.getFieldAreaClass(0, 49);
                break
            }
            case 3: {
                field = gameArea.getFieldAreaClass(49, 49);
                break
            }
            default:
                throw new Error("ops");

        }

        field.addObject(object);

    }

    setNewIo(clientIo){
        this.__io = clientIo;
        this.__initSocketRequest();
    }


    __initSocketRequest() {

        let apiProps = {
            io: this.__io,
            gameClass: this.__gameClass,
        };

        this.__apiArea = new apiArea(apiProps);

        this.__apiArea.onUpdated(this._owner);

    }

    startGame() {
        this.__initSocketRequest();
    }

    getAllObjects() {
        return this._owner.objects.map(value => value.getUuid())
    }


    getOwnerUuid() {
        return this._owner.uuid;
    }


}

module.exports = Client;