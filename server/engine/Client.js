const OwnerClass = require('../models/Owner.class');
const ObjectClass = require('../models/Object.class');

const apiArea = require('../api/area');
const apiObject = require('../api/object');


class Client {

    constructor(props) {
        this.__io = props.clientIo;
        this.__gameClass = props.gameClass;
        this.__apiArea = null;
        this.__apiObject = null;

        this._owner = new OwnerClass({name: "Gamer: "+props.count});

        const object = new ObjectClass({
            name: "Okręt 1",
            rangeView: 3 + props.count,
            shield: 6,
            rangeMove: 2,
            owner: this._owner
        });

        const object2 = new ObjectClass({
            name: "Okręt 2",
            rangeView: 3 + props.count,
            shield: 6,
            rangeMove: 2,
            owner: this._owner
        });
        let field = null;
        let field2 = null;
        const gameArea = props.gameClass.getArea();

        switch (props.count) {
            case 0: {
                field = gameArea.getFieldAreaClass(0, 0);
                field2 = gameArea.getFieldAreaClass(0, 2);
                break
            }
            case 1: {
                field = gameArea.getFieldAreaClass(4, 2);
                field2 = gameArea.getFieldAreaClass(4, 4);
                break
            }
            case 2: {
                field = gameArea.getFieldAreaClass(0, 49);
                field2 = gameArea.getFieldAreaClass(35, 20);
                break
            }
            case 3: {
                field = gameArea.getFieldAreaClass(49, 49);
                field2 = gameArea.getFieldAreaClass(14, 14);
                break
            }
            default:
                throw new Error("ops");

        }
        field && field.addObject(object);
        field2 && field2.addObject(object2);
        this.__gameClass.addOwner(this._owner);
    }

    setNewIo(clientIo) {
        this.__io = clientIo;
        this.__initSocketRequest();
    }

    objectUpdateMove(payload, callback) {
        const findObject = this._owner.objects.find(value => value.getUuid() === payload.uuid);
        if (findObject) {
            //this.__gameClass.lifeCircle(this._owner);
            let result = this.__gameClass.action_move(findObject, payload.axis.x, payload.axis.y);
            const owner = findObject.getOwner();
            if (result) {

                this.emitAllUpdateArea();

                if (owner.action < 1) {
                    let circleOwner = this.nextLifeCircleOwner(owner.uuid);
                    console.log(circleOwner);
                    this.whoIsRound(circleOwner)
                }
            }
        }
    }

    onUpdateArea() {
        this.__apiArea.onUpdated(this._owner);
    }

    whoIsRound(){
        return void 0;
    }

    // abstract  tworzona w Engine class
    emitAllUpdateArea() {
        return void 0;
    }

    // abstract tworzona w Engine class
    nextLifeCircleOwner(uuid) {
        return void 0;
    }


    __initSocketRequest() {

        let apiProps = {
            io: this.__io,
            gameClass: this.__gameClass,
        };

        this.__apiArea = new apiArea(apiProps);
        this.__apiObject = new apiObject(apiProps);

        this.__apiObject.setUpdateListener(this.objectUpdateMove.bind(this));

        this.onUpdateArea();

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