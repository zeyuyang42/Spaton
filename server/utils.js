// function to get local IP-Addresses
const getIPAddresses = function () {
    const os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];
    for (var deviceName in interfaces){
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }
    return ipAddresses;
};

const getObjectById = function (dataArray, id) {
    return dataArray.find(item => item.id === id);
}

const getObjectByName = function (dataArray, name) {
    return dataArray.find(item => item.name === name);
}

module.exports = { getIPAddresses, getObjectById, getObjectByName };