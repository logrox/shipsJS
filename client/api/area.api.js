import {connection} from './socket.js'

export function getArea(uuid, callback) {
    const socketGame = connection();

    socketGame.emit('get', {uuid}, (response) => {
        callback(response, +new Date());
    });
    /*socketGame.emit("login", {dane: "brak"}, response => {
        console.log(response);
    })*/

}