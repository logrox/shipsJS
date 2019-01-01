import '../components/buttonUuid.component.js';

window.addEventListener('load', () => {

    const main = document.querySelector('main');

    const buttonUuid = document.createElement('button-uuid');

    buttonUuid.addEventListener('getUuid', (props) => {
        console.log(props)
    });

    main.append(buttonUuid);

    //Template

    const link = document.querySelector("#import-template-test").import;
    const templateTest = link.querySelector('#template-test');
    const body = document.querySelector('main');

    body.appendChild(document.importNode(templateTest.content, true));
});



