import '../components/buttonUuid.component.js';
import {AreaMap} from '../components/cAreaMap.component.js';
import {FieldInfo} from '../components/cFieldInfo.component.js';

window.addEventListener('load', () => {

    const main = document.querySelector('main');

    const buttonUuid = document.createElement('button-uuid');
    const areaMap = document.createElement(AreaMap.componentName);
    areaMap.init(50, 50);

    buttonUuid.addEventListener('getUuid', (props) => {
        if (!props.detail.error) {
            areaMap.updateCells(props.detail.data, props.detail.payload.dateTimeChange);
        } else {
            console.error(props.detail.error);
        }
    });


    main.append(buttonUuid);

    main.append(document.createElement('br'));

    main.append(areaMap);

    areaMap.addEventListener(AreaMap.eventFieldClick, evt => {
        console.log(
            evt.detail)
    });

    const fieldInfo = document.createElement(FieldInfo.tagName);
    main.appendChild(fieldInfo);

    /*//Template

    const link = document.querySelector("#import-template-test").import;
    const templateTest = link.querySelector('#template-test');
    const body = document.querySelector('main');
    body.appendChild(document.importNode(templateTest.content, true));
    */
});



