const EventClass = require('./Event.class');
const uuid = require('../helpers/uuid');

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

        // zasięg ruchu na akcję
        this.rangeMove = props.rangeMove || 0;

        //rozmiar na planszy gry
        this.size = props.size || 1;
        // maksymalna liczba możliwych w posiadaniu broni
        this.__maxWeapons = props.maxWeapons || 0;
        //Lista posiadanych broni
        this.weapons = [];
        //todo Dodać liste z minami,zasłonami

        if (!props.owner) {
            throw new Error('props "owner" is required');
        }
        this.__owner = props.owner;
        this.__uuid = uuid();

        this.__fieldAreaClass = null;

        this.__owner.addObject(this);


    }

    getUuid() {
        return this.__uuid;
    }

    setInFieldArea(fieldAreaClass) {
        this.__fieldAreaClass = fieldAreaClass;
    }

    getFieldArea() {
        return this.__fieldAreaClass
    }

    addWeapon(weaponClass) {
        if (weaponClass.getOwner() !== this.__owner) {
            console.error('bad owner');
            return -1;
        }

        if (this.weapons.length >= this.__maxWeapons) {
            console.error('full weapons');
            return -1;
        }

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

        //sprawdzenie dystansu do atakowanego pola
        let computedDistance = this.__fieldAreaClass.computedDistance(fieldAreaClass);
        if (computedDistance.x > weaponClass.rangeAttack || computedDistance.y > weaponClass.rangeAttack) {
            return false;
        }

        //sprawdzenie czy bron ma amunicję, gdy 0 to pusta
        let magazine = weaponClass.getMagazine();
        if (magazine === 0) {
            return false;
        }

        // tworzenie zdarzenia
        const eventClass_shot = new EventClass({
            shield: weaponClass.shield,
            cuirass: weaponClass.cuirass,
            owner: this.getOwner()
        });

        //Gdy po odjęciu z magazynku naboju(łuski) są jeszcze naboje to załaduj kolejny
        // poniewarz po strzale EventClass odejmuje (cuirass,shield)
        if (weaponClass.setMagazine(-1)) {
            weaponClass.load();
        }

        fieldAreaClass.propagateEvent(eventClass_shot);
        return true;
    }

    render(ownerClass) {

        if (ownerClass.getOwner() === this.getOwner()) {
            return {
                name: this.name,
                owner: true,
                cuirass: this.cuirass,
                uuid: this.__uuid,
                shield: this.shield,
                rangeView: this.rangeView,
                rangeMove: this.rangeMove,
                weapon: this.weapons.length > 0 ? this.weapons.map(weapon => weapon.render()) : this.weapons
            }
        }

        return {
            name: this.name,
            owner: false,
            cuirass: this.cuirass,
            shield: this.shield,
        }

    }

}


module.exports = ObjectClass;