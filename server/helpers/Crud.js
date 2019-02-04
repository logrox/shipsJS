class Crud {

    constructor({io, prefix} = {}) {
        const socket = io;
        this._socket = socket;
        this._prefix = prefix;

        //socket.on('connect', (handle) => {
        socket
            .on(`get`, (payload, callback) => this.get(payload, callback))
            .on(`find`, (data, callback) => this.find(data, callback, true))
            .on(`create`, (data, callback) => this.create(data, callback, true))
            .on(`update`, (data, callback) => this.update(data, callback, true))
            .on(`delete`, (data, callback) => this.delete(data, callback, true));

        // })

    }

    get(payload, callback) {
        callback({
            error: 'method get is not implemented',
            data: null
        });

    }

    find(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method find is not implemented'),
                data: null
            };
        }
    }

    update(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method update is not implemented'),
                data: null
            };
        }

    }

    create(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method create is not implemented'),
                data: null
            };
        }

    }

    delete(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method delete is not implemented'),
                data: null
            };
        }
    }

    response() {

    }
}

module.exports = Crud;