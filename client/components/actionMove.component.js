import {actionMove} from '../api/move.api.js';
import {listenerUpdatedCommon} from '../api/common.api.js';

export class actionMoveComponent extends HTMLElement {
    static get componentName() {
        return "c-action-move";
    };


    constructor() {
        super();

        this.__selectedObjectUuid = null;
        this.__axis = null;

        const shadow = this.attachShadow({mode: 'open'});

        const button = document.createElement('button');
        button.textContent = "Ruch";

        this._span = document.createElement('span');
        this._spanAxis = document.createElement('span');

        button.addEventListener("click", evt => {

            console.log({
                selectedObjectUuid: this.__selectedObjectUuid,
                axis: this.__axis,
            });

            if (this.__selectedObjectUuid && this.__axis) {
                actionMove(this.__selectedObjectUuid, this.__axis, response => {
                    console.log(response)
                });
            }

        });
        listenerUpdatedCommon((response, time)=>{

        })


        shadow.appendChild(button);
        shadow.appendChild(this._span);
        shadow.appendChild(this._spanAxis);
    }

    /**
     * @description Ustawia aktywność przycisku
     * @param disabled: Boolean
     */
    disabledButton(disabled){

    }

    clear() {
        this.__selectedObjectUuid = null;
        this._span.innerText = ``;
        this.__axis = null;
        this._spanAxis.innerText = ``;
    }

    putObject(objectUuid) {
        if (objectUuid) {
            this.__selectedObjectUuid = objectUuid;
            this._span.innerText = `uuid: ${objectUuid}; `;
            return true
        }
        return false
    }

    putAxis(axis) {
        if (axis) {
            this.__axis = axis;
            this._spanAxis.innerText = `x:${axis.x} y:${axis.y} `;
            return true
        }
        return false
    }

}

customElements.define(actionMoveComponent.componentName, actionMoveComponent);