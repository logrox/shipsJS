
class OwnerClass {

    constructor(props = {}) {

        this.name = props.name || "no name";
        this.gold = 0;

    }


    getOwner(){
        return this;
    }
}


module.exports = OwnerClass;