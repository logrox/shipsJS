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

    getFieldsFromRange(fieldAreaClass, range) {
        if (range === 0) {
            return [];
        }
        const coordinate = fieldAreaClass.getCoordinate();

        let startX = coordinate.x - range;
        let endX = coordinate.x + range + 1;

        let startY = coordinate.y - range;
        let endY = coordinate.y + range + 1;

        if (startX < 0) {
            startX = 0;
        }

        if (startY < 0) {
            startY = 0;
        }

        const X = this.__coordinateAxis.slice(startX, endX);

        const fields = [];

        X.forEach(Y => {

            fields.push(...Y.slice(startY, endY));
        });

        return fields;

    }

    lifeCircleAllField(ownerClass){

        console.warn('Please don`t used');

        this.__coordinateAxis.forEach(valueX => {
            valueX.forEach(valueY=>{
                valueY.lifeCircle(ownerClass);
            })
        })
    }

    render(ownerClass) {
        // zwraca wszystkie pola dla popdanego właściciela wywołując w każdym polu metodę render.

        const objects = ownerClass.objects;

        let renderResult = [];

        objects.forEach(object => {
            const fieldAreaClass = object.getFieldArea();
            const rangeView = object.rangeView;
            if (fieldAreaClass) {
                const fields = this.getFieldsFromRange(fieldAreaClass, rangeView);

                const fieldAreaClassRender = fields.map(field => field.render(ownerClass));

                renderResult.push(...fieldAreaClassRender);
            }

        });

        return renderResult;
    }


}


module.exports = AreaClass;