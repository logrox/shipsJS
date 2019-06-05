export class FieldInfo extends HTMLElement {
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

    __init() {

        const container = document.createElement('div');

        const divTitle = document.createElement('span');
        this.__spanTitle = divTitle;
        container.appendChild(divTitle);

        const divOwner = document.createElement('p');
        this.__spanOwner = divOwner;
        container.appendChild(divOwner);


        const containerArmour = document.createElement('div');
        const divArmour = document.createElement('span');
        const spanArmour = document.createElement('span');
        this.__spanArmour = divArmour;
        spanArmour.textContent = "Wytrzymałość: ";
        containerArmour.appendChild(spanArmour);
        containerArmour.appendChild(divArmour);
        container.appendChild(containerArmour);

        const divShield = document.createElement('span');
        const titleShield = document.createElement('span');
        titleShield.textContent = "Tarcza: ";

        this.__spanShield = divShield;

        container.appendChild(titleShield);
        container.appendChild(divShield);

        this.__shadow.appendChild(container);

    }

    setData(props) {

        const {title, owner, armour, shield} = props || {};
        this.__spanTitle.textContent = title || "-";
        this.__spanOwner.textContent = owner || "-";
        this.__spanArmour.textContent = armour || "-";
        this.__spanShield.textContent = shield || "-";

    }
}

customElements.define(FieldInfo.componentName, FieldInfo);
