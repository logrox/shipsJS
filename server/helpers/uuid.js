module.exports = function uuid() {

    const unique = ()=> Math.floor((1 + Math.random()) * 65536)
        .toString(16)
        .substring(1);

    return unique() + unique() + '-' + unique() + '-' + unique() + '-' +
    unique() + '-' + unique() + unique() + unique();
}