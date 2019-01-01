import {getArea} from '../api/area.api.js';

class buttonUuidComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const button = document.createElement('button');
        const input = document.createElement('input');

        button.textContent = "Podaj uuid";

        button.addEventListener("click", evt => {


            getArea(input.value, ([response]) => {
                const event = new CustomEvent("getUuid", {
                    detail: response
                });
                this.dispatchEvent(event)
            });
        });


        input.setAttribute('type', 'text');

        shadow.appendChild(button);
        shadow.appendChild(input);
    }


}

customElements.define('button-uuid', buttonUuidComponent);