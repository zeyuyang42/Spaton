// a configs object to store all user related variables
var configs = {};

// SSL 
configs.sslcert = "sslcert/absinthismus.crt"; // path to ssl certificate
configs.sslkey = "sslcert/absinthismus.key"; // path to ssl private key

// OSC
configs.oscReceiverIP = "127.0.0.1"; // remote-server IP to which OSC-Messages are sent
configs.oscReceiverPort = 7500;
configs.oscLocalPort = 7400;

// Server ports
configs.webPort = 8443;

// Frontend
configs.frontEndIP = "192.168.178.169";
// configs.frontEndIP = "192.168.0.100";

configs.frontEndPort = 3000;
configs.frontEndAddress = "https://" + configs.frontEndIP + ":" + configs.frontEndPort;

configs.presetAddress = "./presets/preset1.json"


module.exports = configs;