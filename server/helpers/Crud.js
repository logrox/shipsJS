
class Crud{
    get(payload) {
        return Promise.resolve({'dziala': {ok: "ok",payload}})
    }

    find() {
    }

    post() {
    }

    delete() {
    }
}

module.exports = Crud;