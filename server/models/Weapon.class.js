class WeaponClass {

    constructor(props) {
        this.cuirass = props.cuirass || 0;
        this.shield = props.shield || 0;
        this.rangeAttack = props.rangeAttack || 1;
        //aktualny stan magazynku
        this.__magazine = 0;
        //Maksymalna pojemnosc magazynku
        this.__maxMagazine = props.maxMagazine || 1;

        this.load = function () {
            this.cuirass = props.cuirass || 0;
            this.shield = props.shield || 0;
        }
    }


    getMagazine() {
        return this.__magazine;
    }

    setMagazine(count) {
        if ((count > 0 && this.__magazine < this.__maxMagazine) || count < 0) {
            this.__magazine += count;
            if (this.__magazine > this.__maxMagazine) {
                this.__magazine = this.__maxMagazine;
            }
            return true;
        }

        return false;
    }


}

module.exports = WeaponClass;