class GameClass {


    constructor({area, owners} = {}) {
        this.__area = area;
        this.__owners = owners;

        this._roundCount = 0;
        this._roundWhenFinish = Infinity;
    }

    initGame() {

        this.__owners.forEach(ownerClass => {

        });
    }

    getOwners(ownerClass) {
    }

    getFields(ownerClass) {
    }

    lifeCircle(ownerClass) {
        this.__owners.forEach(owner => {
            owner.lifeCircle(ownerClass);
        })
    }

    render(ownerClass) {
        return this.__area.render(ownerClass);
    }

}

module.exports = GameClass;