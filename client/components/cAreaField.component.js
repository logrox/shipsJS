export class AreaField extends HTMLElement {

    static get componentName() {
        return "c-area-field";
    };

    static get eventReset() {
        return AreaField.componentName + "#event-reset";
    };

    static get eventClickField() {
        return AreaField.componentName + "#event-click-field";
    };


    constructor() {
        super();
        this.__field = null;
        this.__dateTimeChange = 0;
        this.__cellData = null;
        this.__shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
            div:hover:not(.none) {
                cursor: pointer;
                background-color: blue !important;
            }
        `;

        document.addEventListener(AreaField.eventReset, evt => {

            if (this.__field !== null && this.__dateTimeChange && this.__dateTimeChange !== evt.detail.dateTimeChange) {
                this.__field.style.backgroundColor = "white";
                this.__field.textContent = "❌";
                this.__dateTimeChange = 0;
                this.__field.classList.add('none');
            }
        });

        this.__shadow.appendChild(style);

    }

    init({height, width}) {
        const field = document.createElement('div');
        field.textContent = "❌";
        field.style.width = width;
        field.style.height = height;
        this.__field = field;

        this.__field.classList.add('none');

        field.addEventListener('click', evt => {
            const event = new CustomEvent(AreaField.eventClickField, {
                detail: this.__cellData
            });
            this.dispatchEvent(event)
        });
        this.__shadow.appendChild(field);
    }

    update(cellData, dateTimeChange) {
        if (this.__field === null) {
            throw 'not defined field';
        }

        let style = this.__field.style;
        this.__cellData = cellData;
        this.__dateTimeChange = dateTimeChange;
        this.__field.classList.remove('none');
        if (cellData.object) {
            this.__field.textContent = "🚢";
            style.backgroundColor = "red";
            if (cellData.object.owner) {
                style.backgroundColor = "green";
            }
        } else {
            style.backgroundColor = "white";
            this.__field.textContent = "👁";
        }

    }


}

customElements.define(AreaField.componentName, AreaField);