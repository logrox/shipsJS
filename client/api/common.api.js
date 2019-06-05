import {connection} from './socket.js';

const socketGame = connection();

const listenerUpdatedList = [];

/**
 *
 * @param callback: {Function} (response, time:Date.now)
 * @returns {Function} wywołanie zatrzymuje obserwację
 */
export function listenerUpdatedCommon(callback) {

    listenerUpdatedList.push(callback);

    return () => {
        const index = listenerUpdatedList.indexOf(callback);
        listenerUpdatedList.splice(index, 1);
    }

}

socketGame.on('common@updated', (response) => {
    const time = Date.now();
    listenerUpdatedList.forEach(value => {
        value(response, time)
    });
});