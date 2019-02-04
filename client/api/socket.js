const socket = io().connect();

console.log("socket");

export const connection= function(){
    return socket;
};