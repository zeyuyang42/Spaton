const configs = {};

configs.initInfo = "Please choose an available route:";

configs.serverIP = "192.168.178.169";
// configs.serverIP = "192.168.0.100";
configs.serverPort = "8443";
configs.serverAddress = `https://${configs.serverIP}:${configs.serverPort}`;

configs.routePresetAddress = `${configs.serverAddress}/preset`;

export default configs
