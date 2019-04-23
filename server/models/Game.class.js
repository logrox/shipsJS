class GameClass {


    constructor({area, owners} = {}) {
        this.__area = area;
        this.__owners = owners || [];

        this._roundCount = 0;
        this._roundWhenFinish = Infinity;
    }

    addOwner(owner){
        this.__owners.push(owner);
    }

    action_move(objectClass, x, y) {
        // Pobranie właściciela objektu
        const owner = objectClass.getOwner();

        // Sprawdzenie czy właściciel może wykonać akcję
        if (owner.action < 1) {
            return false;
        }
        // nagroda za ruch 1zł
        owner.setGold(1);

        // zmniejszenie o 1 liczbę dostępnych akcji
        owner.setAction(-1);

        // Pobranie dystansu o jaki można przesunąć obiekt
        const rangeMove = objectClass.rangeMove;

        // Pobranie obszaru na jakim znajduje się obiekt aktualnie
        const field = objectClass.getFieldArea();

        // pobranie obszaru na jaki obiekt ma zostać ustawiony
        const targetField = this.__area.getFieldAreaClass(x, y);

        // Obliczenie dystansu do docelowego obszaru
        const distance = field.computedDistance(targetField);

        if (field !== targetField && distance.x <= rangeMove && distance.y <= rangeMove ) {

            // Ustawienie obiektu na wybranym obszarze (zwraca obiekt na obszarze albo null)
            let objectOnField = targetField.addObject(objectClass);

            //sprawdzenie czy się udało (obszar może być zajęty przez inną jednostkę) || mogło się udac ustawić ale była mina i obiekt został zniszczony
            if (objectOnField === objectClass || objectOnField === null) {

                //Usunięcie z poprzedniego obszaru obiekt
                field.removeObject();

                return true;
            }
        }

        return false;

    }

    action_shot(objectClass, weaponIndex, x, y) {

        // Pobranie właściciela objektu
        const owner = objectClass.getOwner();

        // Sprawdzenie czy właściciel może wykonać akcję
        if (owner.action < 1) {
            return false;
        }

        // zmniejszenie o 1 liczbę dostępnych akcji
        owner.setAction(-1);

        //Pobranie obszaru jaki ma zostać ostrzelany
        const targetField = this.__area.getFieldAreaClass(x, y);

        return objectClass.createShot(weaponIndex, targetField);
    }

    action_mine(objectClass, mine, x, y) {
    }

    action_smoke(objectClass, smoke, x, y) {
    }

    initGame() {

        this.__owners.forEach(ownerClass => {

        });
    }

    getOwner(uuid) {
        return this.__owners.find(value => value.getOwner().uuid === uuid) || null;
    }

    getArea() {
        return this.__area;
    }
    getFields(ownerClass) {
    }

    lifeCircle(ownerClass) {
        this.__owners.forEach(owner => {
            owner.lifeCircle(ownerClass);
        })
    }

    render(ownerClass) {
        return this.__area.render(ownerClass);
    }

}

module.exports = GameClass;