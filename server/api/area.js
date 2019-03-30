const Crud = require('../helpers/Crud');

class Area extends Crud {
    constructor({gameClass, io}) {
        super({io, prefix: "area"});
        this.userUuid = null;
        io.use((payload, next) => {

            if (payload[3]) {
                this.userUuid = payload[3].userUuid;
            }
            next();
        });
        this.__gameClass = gameClass;
    }


    onFind(payload, callback) {
        if (this.userUuid === null) {
            callback({error: `Not find owner`, data: null});
        }
        const ownerClass = this.__gameClass.getOwner(this.userUuid);
        if (ownerClass) {
            let render = this.__gameClass.render(ownerClass);
            try {
                callback({data: render, error: null});
            } catch (e) {
                console.log(e)
            }

        } else {
            callback({error: `Not find owner \"${this.userUuid}\"`, data: null});
        }
    }


}

module.exports = Area;