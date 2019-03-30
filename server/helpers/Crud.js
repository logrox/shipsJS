class Crud {

    constructor({io, prefix} = {}) {
        const socket = io;
        this._socket = socket;
        this._prefix = prefix;

        //socket.on('connect', (handle) => {
        socket
            .on(`${this._prefix}@get`, (payload, callback) => this.onGet(payload, callback))
            .on(`${this._prefix}@find`, (data, callback) => this.onFind(data, callback, true))
            .on(`${this._prefix}@create`, (data, callback) => this.onCreate(data, callback, true))
            .on(`${this._prefix}@update`, (data, callback) => this.onUpdate(data, callback, true))
            .on(`${this._prefix}@delete`, (data, callback) => this.onDelete(data, callback, true));

        // })

    }

    onGet(payload, callback) {
        callback({
            error: 'method get is not implemented',
            data: null
        });

    }

    onFind(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method find is not implemented'),
                data: null
            };
        }
    }

    onUpdate(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method update is not implemented'),
                data: null
            };
        }

    }

    onCreate(payload, notImplement = false) {
        if (notImplement) {
            return {
                error: Error('method create is not implemented'),
                data: null
            };
        }

    }

    onDelete(payload, notImplement = false) {
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