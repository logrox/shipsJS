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

        const divTitle = document.createElement('p');
        this.__spanTitle = divTitle;
        container.appendChild(divTitle);

        const divOwner = document.createElement('p');
        this.__spanOwner = divOwner;
        container.appendChild(divOwner);

        const divArmour = document.createElement('p');
        this.__spanArmour = divArmour;
        container.appendChild(divArmour);

        const divShield = document.createElement('p');

        this.__spanShield = divShield;
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
