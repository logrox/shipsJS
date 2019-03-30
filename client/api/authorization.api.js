import {connection} from './socket.js'
const socket = connection();
export function authorization({username, key, sessionUuid}, callback) {


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