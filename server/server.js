//--------------------------------------------------
//  Dependencies  
//--------------------------------------------------
const express = require('express');
// const path = require('path');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const { Server } = require('socket.io');
const osc = require("osc");

const {getIPAddresses , getObjectById,  getObjectByName} = require('./utils');
const configs = require('./configs');
const routes = require(configs.presetAddress);
//--------------------------------------------------
//  BACKEND SETUP
//--------------------------------------------------
const app = express(); // Create express application

app.use(cors()); //add cors() to default "/"
app.use(express.json()); //parse incoming requests

// setup https server
const privateKey  = fs.readFileSync(configs.sslkey, 'utf8');
const certificate = fs.readFileSync(configs.sslcert, 'utf8');
const credentials = {key: privateKey, cert: certificate};
const server = https.createServer(credentials, app); 

const io = new Server(server, {
    cors: {
        origin: configs.frontEndAddress,
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => socketResponse(socket));

server.listen(configs.webPort, () => {
    console.log(`INFO: server running at https://localhost:${configs.webPort}`);
    var ipAddresses = getIPAddresses();
    ipAddresses.forEach(function (address) {
        console.log(`INFO: server running at https://${address}:${configs.webPort}`);
    });
});

//--------------------------------------------------
//  WEBSOCKET APPLICATION
//--------------------------------------------------
function socketResponse(socket) {
    console.log(`INFO: Client connected: ${socket.id}`);
    //debug
    socket.on('message', (message) => {
        console.log(`Test Message: ${message}`);
        console.log(`From  Client: ${socket.id}`);
    });

    socket.on('toOccupy', (routeId) => {
        const route = getObjectById(routes, routeId);
        if (!route.occupied) {
            route.occupied = true;
            route.client = socket.id;
            socket.emit('occupied', routeId);
            console.log(`INFO: route ${routeId} is occupied by client: ${socket.id}`);
        }
        else{
            console.log(`INFO: route ${routeId} is already taken by ${socket.id}`);
        }
    });

    socket.on('toRelease', (routeId) => {
        const route = getObjectById(routes, routeId);
        if (route.occupied) {
            route.occupied = false;
            route.client = 'undefined';
            socket.emit('released', routeId);
            console.log(`INFO: route  ${routeId} is released from client: ${socket.id}`);
        }
        else{
            console.log(`INFO: route ${routeId} is not taken by ${socket.id}`);
        }
    });

    socket.on('osc', (oscMessage) => {
        // console.log(`oscMessage.routeId: ${oscMessage.routeName}`);
        const route = getObjectByName(routes, oscMessage.routeName);
        if (route.client !== socket.id) return;

        const oscAddress = "/" + oscMessage.routeName + "/" + oscMessage.eventName;
        console.log(`oscAddress: ${oscAddress}`);
        console.log(`oscValue: ${oscMessage.value}`);
        // console.log(`From  Client: ${socket.id}`);

        udpPort.send({
            address: oscAddress, 
            args: [{
                type: "f", 
                value: oscMessage.value
            }]
        }, udpPort.options.remoteAddress, udpPort.options.remotePort);

    });

    socket.on("disconnect", (reason) => {
        console.log(`INFO: Client disconnected: ${socket.id} ${reason}`)
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.client === socket.id) {
                route.occupied = false;
                route.client = 'undefined';
                console.log(`INFO: route ${route.id} taken by ${socket.id} is released`);
            }
        }
    });
}
//--------------------------------------------------
//  EXPRESS APPLICATION
//--------------------------------------------------
app.get('/', (req, res) => {
    res.send('<h1>:></h1>');
});

app.get('/routes', (req, res) => {
    // console.log(`Fetch request`);
    res.json(routes);
});
//--------------------------------------------------
//  OSC(UDP) Port
//--------------------------------------------------
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: configs.localPort,
    remoteAddress: configs.oscReceiverIP,
    remotePort: configs.oscReceiverPort
});

udpPort.open();

udpPort.on("ready", function () {
    const remoteAddress = udpPort.options.remoteAddress;
    const remotePort = udpPort.options.remotePort;
    console.log("INFO: Broadcasting OSC over UDP to", remoteAddress + ", Port:", remotePort);
});