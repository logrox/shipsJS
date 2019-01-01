const Crud = require('../helpers/Crud');

class Area extends Crud {
    constructor({gameClass, io, prefix}) {
        super({io, prefix});
        this.__gameClass = gameClass;
    }


    get(payload, callback) {
        const {uuid} = payload;
        const ownerClass = this.__gameClass.getOwner(uuid);
        if (ownerClass) {
            let render = this.__gameClass.render(ownerClass);
            try {
                callback({data: render, error: null});
            } catch (e) {
                console.log(e)
            }

        } else {
            callback({error: `Not find owner \"${uuid}\"`, data: null});
        }
    }


}

module.exports = Area;