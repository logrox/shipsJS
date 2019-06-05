const Crud = require('../helpers/Crud');

class Object extends Crud {
    constructor({gameClass, io, prefix}) {
        super({io, prefix: "move"});



        this.userUuid = null;
        io.use((payload, next) => {

            if (payload[3]) {
                this.userUuid = payload[3].userUuid;
            }
            next();
        });
        this.__gameClass = gameClass;
    }


    onUpdate(payload, callback) {

        this.__updateListener(payload, callback)
    }

    setUpdateListener(callback) {
        this.__updateListener = callback;
        return () => {
            this.__updateListener = () => ({error: `Not find implemented`, data: null});
        }
    }


}

module.exports = Object;