

export class loginComponent extends HTMLElement {
    static get componentName() {
        return "c-login";
    };

    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const button = document.createElement('button');
        button.textContent = "Zaloguj";

        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('placeholder', 'Nazwa');

        const inputKey = document.createElement('input');
        inputKey.setAttribute('type', 'password');
        inputKey.setAttribute('placeholder', 'klucz');


        button.addEventListener("click", evt => {

                const event = new CustomEvent("login", {
                    detail: {
                        payload: {username: inputName.value, key:inputKey.value}
                    }
                });
                this.dispatchEvent(event)
        });


        shadow.appendChild(inputName);
        shadow.appendChild(inputKey);
        shadow.appendChild(button);
    }


}

customElements.define(loginComponent.componentName, loginComponent);