const EventClass = require('./Event.class');

class ModifierClass {

    constructor(props) {
        this.__name = props.name || 'noname';

        if (!props.owner) {
            throw new Error('props "owner" is required');
        }
        this.__owner = props.owner;

        // tarcza
        this.__shield = props.shield || 0;

        this.__cuirass = props.cuirass || 1;

        this.__lifeCircle = props.lifeCircle || Infinity;

    }

    lifeCircle(fieldAreaClass) {

        this.__lifeCircle = this.__lifeCircle - 1;
    }

    get name() {
        return this.__name
    }

    getOwner() {
        return this.__owner.getOwner();
    }

    getInstance() {

        return (this.__cuirass === 0 || this.__lifeCircle <= 0) ? null : this;

    }

    checkActionObject(objectClass) {
    }

    checkActionEvent() {
    }

    checkActionField(fieldAreaClass) {
    }

    render(ownerClass) {
        if (ownerClass.getOwner() === this.getOwner()) {
            return {
                owner: this.getOwner().uuid,
                shield: this.__shield,
                cuirass: this.__cuirass,
                lifeCircle: this.__lifeCircle,
                name: this.__name
            }
        }
        return {
            owner: null
        }

    }

}


class SmokescreenClass extends ModifierClass {

    //nam 4 tury.

    constructor(props) {
        super({
            name: props.name,
            owner: props.owner,
            cuirass: NaN,
            shield: NaN,
            lifeCircle: props.lifeCircle
        });
    }

    checkActionField(fieldAreaClass) {
        fieldAreaClass.hiddenAll = this.__lifeCircle > 0;
    }

    lifeCircle(fieldAreaClass) {
        super.lifeCircle();
        fieldAreaClass.hiddenAll = this.__lifeCircle > 0;
    }


}

class BombClass extends ModifierClass {
    constructor(props) {
        super({
            name: props.name,
            owner: props.owner,
            cuirass: props.cuirass,
            shield: props.shield,
        });
        this.__event = new EventClass({cuirass: props.cuirass, owner: props.owner});
    }

    checkActionObject(objectClass) {
        this.__event.takeActionObject(objectClass);
        this.__cuirass = 0;
    }

    checkActionEvent() {
        this.__cuirass = 0;
    }
}

module.exports = {
    BombClass,
    SmokescreenClass
};