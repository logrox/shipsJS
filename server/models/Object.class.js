const EventClass = require('./Event.class');

class ObjectClass {

    constructor(props) {
        //super(props);

        //  nazwa jednostki militarnej
        this.name = props.name || 'noname';

        //  pancerz
        this.cuirass = props.cuirass || 1;

        // tarcza
        this.shield = props.shield || 0;

        // zasięg widzenia
        this.rangeView = props.rangeView || 0;

        // liczba ruchów na akcję
        this.move = props.move || 0;

        //rozmiar na planszy gry
        this.size = props.size || 1;

        this.weapons = props.weapons || [];

        if (!props.owner) {
            throw new Error('props "owner" is required');
        }
        this.__owner = props.owner;

        this.__fieldAreaClass = null;

    }

    setInFieldArea(fieldAreaClass) {
        this.__fieldAreaClass = fieldAreaClass;
    }

    addWeapon(weaponClass) {
        return this.weapons.push(weaponClass) - 1;
    }

    checkActionEvent(objectEvent) {
        objectEvent.takeActionObject(this);
    }

    getOwner() {
        return this.__owner.getOwner();
    }

    getInstance() {

        return this.cuirass === 0 ? null : this;

    }

    createShot(indexWeapon, fieldAreaClass) {
        const weaponClass = this.weapons[indexWeapon];
        if (!weaponClass) {
            throw new Error(`Not find Weapon in index ${indexWeapon}`);
        }

        //todo sprawdzenie dystansu do atakowanego pola
        let computedDistance = this.__fieldAreaClass.computedDistance(fieldAreaClass);
        if (computedDistance.x >  weaponClass.rangeAttack || computedDistance.y >  weaponClass.rangeAttack) {
            return false;
        }

        const eventClass_shot = new EventClass({
            shield: weaponClass.shield,
            cuirass: weaponClass.cuirass,
            owner: this.getOwner()
        });

        fieldAreaClass.propagateEvent(eventClass_shot);
        return true;
    }

    render(ownerClass) {

        if (ownerClass.getOwner() === this.getOwner()) {
            return {
                name: this.name,
                owner: this.getOwner(),
                cuirass: this.cuirass,
                shield: this.shield,
                rangeView: this.rangeView,
                weapon: this.weapons
            }
        }

        return {
            name: this.name,
            owner: this.getOwner(),
            cuirass: this.cuirass,
            shield: this.shield,
        }

    }

}


module.exports = ObjectClass;