import {connection} from './socket.js';

const socketGame = connection();


export function actionMove(uuid, axis, callback) {


    socketGame.emit('move@update', {uuid, axis}, (response) => {
        callback(response, Date.now());
    });


}