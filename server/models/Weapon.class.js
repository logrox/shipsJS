class WeaponClass {

    constructor(props) {
        this.cuirass = props.cuirass;
        this.shield = props.shield || 0;
        this.rangeAttack = props.rangeAttack || 1;
    }



}

module.exports = WeaponClass;