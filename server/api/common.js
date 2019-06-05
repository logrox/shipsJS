const Crud = require('../helpers/Crud');

class Common extends Crud {
    constructor({gameClass, io}) {
        super({io, prefix: "common"});

        this.userUuid = null;
        io.use((payload, next) => {

            if (payload[3]) {
                this.userUuid = payload[3].userUuid;
            }
            next();
        });
        this.__gameClass = gameClass;

    }

    emitWhoIsRound(clientClass){
        if(clientClass && clientClass._owner){
            this._socket.emit(`${this._prefix}@updated`, {data: {actualRound: clientClass._owner.name}, error: null});
        }else {
            this._socket.emit(`${this._prefix}@updated`, {data: null, error: 'not find clientClass'});
        }

    }


}

module.exports = Common;