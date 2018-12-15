class OwnerClass {


    constructor(props = {}) {

        this.name = props.name || "no name";
        this.gold = 0;
        this.__maxAction = 1;
        this.action = 1;
        //Lista posiadanych obiektów
        this.objects = [];

        this.__lifeCircleRefFieldArea = [];

    }

    addLifeCircle(fieldAreaClass) {
        this.__lifeCircleRefFieldArea.push(fieldAreaClass);
    }

    lifeCircle(ownerClass) {
        this.__lifeCircleRefFieldArea.forEach(value => {
            value.lifeCircle(ownerClass);
        });
    }

    __setMaxAction(count) {
        this.__maxAction += count;
    }

    getAction() {
        return this.action;
    }

    getOwner() {
        return this;
    }

    addObject(objectClass) {
        this.objects.push(objectClass);
        this.__setMaxAction(1);
    }

    removeObject(objectClass) {
        const index = this.objects.indexOf(objectClass);
        const removed = this.objects.splice(index, 1);
        if (removed.length) {
            this.__setMaxAction(-1);
        }
        return removed.length;
    }
}


module.exports = OwnerClass;