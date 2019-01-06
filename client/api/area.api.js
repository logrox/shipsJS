const socketGame = io('/game').connect();

export function getArea(uuid, callback) {
    socketGame.emit('get', {uuid}, (response) => {
        callback(response,+ new Date());
    });
}