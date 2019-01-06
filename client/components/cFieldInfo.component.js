export class FieldInfo extends HTMLElement{
    static get componentName() {
        return "c-field-info";
    };

    constructor() {
        super();

        this.__shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            
        `;
        this.__shadow.appendChild(style);
        this.__init();
    }

    __init(){

        const container = document.createElement('div');

        const divTitle =  document.createElement('p.title');
        this.__divTitle = divTitle;
        container.appendChild(divTitle);

        const divOwner = document.createElement('p.owner');
        this.__owner = divOwner;
        container.appendChild(divOwner);

        const divArmour = document.createElement('p.armour');
        this.__divArmour = divArmour;
        container.appendChild(divArmour);

        const divShield = document.createElement('p.shield');
        this.__divShield = divShield;
        container.appendChild(divShield);

        this.__shadow.appendChild(container);

    }
}

customElements.define(FieldInfo.componentName, FieldInfo);
