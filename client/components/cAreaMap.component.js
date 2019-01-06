import {AreaField} from "./cAreaField.component.js";

export class AreaMap extends HTMLElement {

    static get componentName() {
        return "c-area-map"
    };

    static get eventFieldClick() {
        return AreaMap.componentName + "#event-field-click";
    };

    constructor() {
        super();
        this.__shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');

        style.textContent = `
          c-area-field{
            font-size: 9px;
            text-align: center;
            vertical-align: middle;
            display: inline-block;
            padding: 0;
            margin: 0;
          }
          div > div{
            display: block;
            margin: 0;
            padding: 0;
            height: 15px;
          }
        `;

        this.___areaMap = new Map();
        this.__shadow.appendChild(style);
    }

    init(maxX, maxY) {
        const widthHeight = 18;
        const nodes = Array.from({length: maxX}, (vx, x) => {

            const row = document.createElement('div');

            const cell = Array.from({length: maxY}, (vy, y) => {

                const key = `${x};${y}`;

                const areaField = document.createElement(AreaField.componentName);
                areaField.init({
                    height: `${widthHeight}px`,
                    width: `${widthHeight}px`
                });

                areaField.addEventListener(AreaField.eventClickField, evt => {
                    const event = new CustomEvent(AreaMap.eventFieldClick, {
                        detail: evt.detail
                    });
                    this.dispatchEvent(event)
                });

                this.___areaMap.set(key, areaField);
                return areaField;

            });


            row.style.width = (cell.length * widthHeight) + 'px';

            row.append(...cell);
            return row;

        });
        const container = document.createElement('div');
        container.append(...nodes);

        this.__shadow.appendChild(container);
    }

    updateCells(cellsData, dateTimeChange) {

        cellsData.forEach((cellData) => {
            const key = `${cellData.axis.x};${cellData.axis.y}`;
            const areaField = this.___areaMap.get(key);
            areaField.update(cellData, dateTimeChange);
            return areaField;

        });

        const eventReset = new CustomEvent(AreaField.eventReset, {
            detail: {
                dateTimeChange
            }
        });
        document.dispatchEvent(eventReset);

    }


}

customElements.define(AreaMap.componentName, AreaMap);