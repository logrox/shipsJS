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

        this.weapon = props.weapon || [];

        if (!props.owner) {
            throw new Error('props "owner" is required');
        }
        this.__owner = props.owner;

    }

    addWeapon(weaponClass) {
        this.weapon.push(weaponClass);
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

    render(ownerClass) {

        if (ownerClass.getOwner() === this.getOwner()) {
            return {
                name: this.name,
                owner: this.getOwner(),
                cuirass: this.cuirass,
                shield: this.shield,
                rangeView: this.rangeView,
                weapon:this.weapon
            }
        }

        return{
            name: this.name,
            owner: this.getOwner(),
            cuirass: this.cuirass,
            shield: this.shield,
        }

    }

}

class WeaponClass {

    constructor(props) {
        this.cuirass = props.cuirass;
        this.shield = props.shield;
        this.rangeAttack = props.rangeAttack;
    }



}

module.exports = {
    ObjectClass,
    WeaponClass
};