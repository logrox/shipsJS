import {connection} from './socket.js'

export function authorization({username, key, sessionUuid}, callback) {
    const socket = connection();

    socket.emit('authorization', {username, key, sessionUuid}, (response) => {
        console.log("authorization", response);

        if(response.sessionUuid === null){
            window.sessionStorage.clear();
        }else{
            window.sessionStorage.setItem("sessionUuid", response.sessionUuid);
        }

        typeof callback === "function" && callback(response);
    })
}