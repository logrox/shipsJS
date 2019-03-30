import '../components/buttonUuid.component.js';
import {AreaMap} from '../components/cAreaMap.component.js';
import {FieldInfo} from '../components/cFieldInfo.component.js';
import {loginComponent} from '../components/login.component.js';


import {authorization} from '../api/authorization.api.js'
import {listenerUpdatedArea} from '../api/area.api.js'


window.addEventListener('load', () => {

    const main = document.querySelector('main');

    const buttonUuid = document.createElement('button-uuid');
    const areaMap = document.createElement(AreaMap.componentName);

    const fieldInfo = document.createElement(FieldInfo.componentName);

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
        let {object, axis} = evt.detail || {};
        console.log({object, axis});
        if (object) {
            fieldInfo.setData({
                title: "Statek",
                owner: object.owner ? "Tak" : "Nie",
                armour: object.cuirass,
                shield: object.shield,
            })
        } else {
            fieldInfo.setData(null);
        }

    });

    //todo brakuje okreslenia jaki dystans można pokonać w ramach 1 akcji
    const loginForm = document.createElement(loginComponent.componentName);
    loginForm.addEventListener('login', evt => {

        if (evt.detail) {
            const {key, username} = evt.detail.payload;

            authorization({username, key}, () => {
                main.removeChild(loginForm);
            });
        }

    });

    main.appendChild(fieldInfo);


    let sessionUuid = window.sessionStorage.getItem("sessionUuid");
    if (sessionUuid) {
        authorization({sessionUuid}, (response) => {
            if (response.sessionUuid === null) {

                console.log(response);
                main.appendChild(loginForm);
            }
        });
    } else {

        main.appendChild(loginForm);

    }
    const removeUpdateAreaFN = listenerUpdatedArea((data, dateTimeChange) => {
        areaMap.updateCells(data.data, dateTimeChange);
    });

    /*//Template

    const link = document.querySelector("#import-template-test").import;
    const templateTest = link.querySelector('#template-test');
    const body = document.querySelector('main');
    body.appendChild(document.importNode(templateTest.content, true));
    */
});



