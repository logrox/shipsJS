import '../components/buttonUuid.component.js';
import {AreaMap} from '../components/cAreaMap.component.js';
import {FieldInfo} from '../components/cFieldInfo.component.js';
import {loginComponent} from '../components/login.component.js';
import {actionMoveComponent} from '../components/actionMove.component.js';


import {authorization} from '../api/authorization.api.js'
import {listenerUpdatedArea} from '../api/area.api.js'

const store = {
    username: null
};

window.addEventListener('load', () => {

    const main = document.querySelector('main');

    // const buttonUuid = document.createElement('button-uuid');
    const areaMap = document.createElement(AreaMap.componentName);
    const fieldInfo = document.createElement(FieldInfo.componentName);
    const actionMove = document.createElement(actionMoveComponent.componentName);

    areaMap.init(50, 50);

    // buttonUuid.addEventListener('getUuid', (props) => {
    //     if (!props.detail.error) {
    //         areaMap.updateCells(props.detail.data, props.detail.payload.dateTimeChange);
    //     } else {
    //         console.error(props.detail.error);
    //     }
    // });


    //main.append(buttonUuid);
    main.append(actionMove);

    /**
     * @description Odpowiada za przekazanie do actionMove informacji o wybranym obiekcie lub lokalizacja.
     */
    areaMap.addEventListener(AreaMap.eventFieldClick, evt => {
        let {object, axis} = evt.detail || {};
        if (object && object.uuid) {
            return actionMove.putObject(object.uuid);
        } else if (object === null) {
            return actionMove.putAxis(axis);
        }

        actionMove.clear();

    });

    main.append(document.createElement('br'));

    main.append(areaMap);

    /**
     * @description Pobiera informacji o wybranym obiekcie.
     */
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


    const loginForm = document.createElement(loginComponent.componentName);
    loginForm.addEventListener('login', evt => {

        if (evt.detail) {
            const {key, username} = evt.detail.payload;

            authorization({username, key}, () => {
                store.username = username;
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
            }else {
                store.username = response.username;
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



