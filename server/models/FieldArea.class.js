class FieldAreaClass {

    constructor(props) {

        //Zawiera obiekt militarny znajdują się na tym obszarze
        this.objectInArea = null;

        //Zawiera obiekt modyfikatora np. Mina, Pole siłowe, Maskowanie
        this.modifier = null;

        //Zawiera informacje o właścicielu obszaru
        this.owner = null;

        //Czy obiekt jest pokazywany innym graczom
        this.hiddenAll = true;

    }

    lifeCircle() {
        if (this.modifier) {
            this.modifier.lifeCircle(this);
            this.modifier = this.modifier.getInstance();
        }
    }

    propagateEvent(objectEvent) {
        // wywołuje zdarzenie na modyfikatorze i obiekcie
        // może to być np. ostrzelanie obszaru

        if (!this.modifier) {
            // sprawdzenie czy na modyfikator wpływa event
            this.modifier.checkActionEvent(objectEvent);

            //przypisanie modyfikatora do obszaru, modyfikator mógł zostać zniszczony wieć getInstance() zwróci null
            this.modifier = this.modifier.getInstance();
        }
        if (!this.objectInArea) {
            // sprawdzenie czy na obiekt wpływa event
            this.objectInArea.checkActionEvent(objectEvent);

            //zwraca instancje obiektu - o ile już nie został zniszczony przez modifier wtedy zwracane jest null;
            this.objectInArea = this.objectInArea.getInstance();
        }

    }

    /**
     * @description Ustawia obiekt jaki bedzie znajdował sie na tym obszarze
     * */
    addObject(
        // instanacja obiektu jaki zostanie dodany do tego obszaru
        objectClass
    ) {


        //Sprawdzenie czy pole nalezy do innego gracza jeśli jest wolne to można zająć albo samemu jest się włścicielem
        if (this.__checkOwner(objectClass) && this.objectInArea === null) {

            this.objectInArea = objectClass;

            //Wykonanie akcji związanej z modyfikatorami np mina, maskowanie(zasłona dymna)
            this.__checkModifier();

        }


        // zwraca aktualnie znajdujący się obiekt na obszarze
        return this.objectInArea;
    }

    /**
     * @description usuwa obiekt z obszaru (zmiana lokalizacji)
     * */
    removeObject() {

        if (this.__checkOwner(this.objectInArea)) {
            this.objectInArea = null;
        }

    }

    /**
     * @description Ustawienie modyfikatora na obszarze
     * */
    addModifier(modifierClass) {


        //Sprawdzenie czy pole nalezy do innego gracza jeśli jest wolne to można modyfikować albo samemu jest się włścicielem
        if (this.__checkOwner(modifierClass) && this.modifier === null) {
            // dodanie modyfikatora do obszaru
            this.modifier = modifierClass;

            // wykonanie akcje związane z modyfikatorem
            this.__checkModifier()

        }

        return this.modifier;


    }
    getOwner(){
        return this.owner;
    }

    __checkOwner(objectClass) {
        // sprawdza czy (objectClass) ma uprawnienia na wejście w obszar
        // na (objectClass) wywoływane jest getOwner() jeśli są === to kont

        if (!this.owner) {
            return true
        }

        return objectClass.getOwner() === this.owner.getOwner();
    }

    __checkModifier() {

        // sprawdza jakie akcje nalezy wykonać jeśli istnieje modyfikator,
        // bo jeśli istnieje to wykonac na modyfikatorze metodę checkActionObiect(objectClass) aby ten modyfikator odpowiednio zmienił (objectClass)
        // i sam wpłynoł na sobie zachowanie w związku z wykonywaną akcją.

        if (!this.modifier || !this.objectInArea) {
            return void 0;
        }

        const objectClass = this.objectInArea;
        // sprawdzenie akcji zwiazanych z modyfikatorem
        this.modifier.checkActionObject(objectClass);

        //przypisanie modyfikatora do obszaru, modyfikator mógł zostać zniszczony wieć getInstance() zwróci null
        this.modifier = this.modifier.getInstance();

        //zwraca instancje obiektu - o ile już nie został zniszczony przez modifier wtedy zwracane jest null;
        this.objectInArea = objectClass.getInstance();

        return void 0;

    }

    render(ownerClass) {

        // zwraca widoczne dane na obszarze

        if (this.__checkOwner(ownerClass)) {
            return {
                object: this.objectInArea,
                modifier: this.modifier
            }
        }

        if (this.hiddenAll) {
            return {
                object: null,
                modifier: null
            }
        }

        return {
            object: this.objectInArea,
            modifier: null
        }
    }

}


module.exports = FieldAreaClass;