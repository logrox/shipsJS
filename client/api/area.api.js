import {connection} from './socket.js';

const socketGame = connection();

const listenerUpdatedMap = [];

export function listenerUpdatedArea(callback) {

    listenerUpdatedMap.push(callback);

    return () => {
        const index = listenerUpdatedMap.indexOf(callback);
        listenerUpdatedMap.splice(index, 1);
    }

}

socketGame.on('area@updated', (response) => {
    const time = Date.now();
    listenerUpdatedMap.forEach(value => {
        value(response, time)
    });
});

export function getArea(uuid, callback) {


    socketGame.emit('get', {uuid}, (response) => {
        callback(response, +new Date());
    });
    /*socketGame.emit("login", {dane: "brak"}, response => {
        console.log(response);
    })*/


}