
class OwnerClass {

    constructor(props = {}) {

        this.name = props.name || "no name";

    }


    getOwner(){
        return this;
    }
}


module.exports = OwnerClass;