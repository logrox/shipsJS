const FieldAreaClass = require('./FieldArea.class');

class AreaClass {

    constructor(maxX, maxY) {
        if (maxX >= 10 && maxY >= 10) {

            this.__coordinateAxis = Array.from({length: maxX}, (vx, x) => {
                return Array.from({length: maxY}, (vy, y) => new FieldAreaClass({x, y}))
            })

        } else {
            throw Error('')
        }
    }

    getFieldAreaClass(x, y) {

        //zwraca obszar o podaych współrzędnych

        try {
            return this.__coordinateAxis[x][y];
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    render(ownerClass){
        // zwraca wszystkie pola dla popdanego właściciela wywołując w każdym polu metodę render.
    }


}


module.exports = AreaClass;