# Spaton
**Spaton** is the combination of **spatial** and **baton**. The idea behinds Spaton is to use the sensors inherently in phone to control the spatial audio compositions. DeviceOrientation Sensor supported for now.

## OSC Mobile Movement

Luzie Ahrens and Zeyu Yang

Parts of the code were taken from: [OSC in Javascript](https://github.com/colinbdclark/osc.js/) by Colin Clark.

________________________________________________________________________________________________

## README-Content

1. Documentation
2. Installation
3. Usage

________________________________________________________________________________________________

## Documentation


### General Project Structure

Overall the project structure relies on the routing abilities from the module [EXPRESS APP](https://expressjs.com/en/starter/hello-world.html) in Node.js.
For each given osc-route a subpage is created. The subpages are necessary to have the clients know the assigned OSC-parameter as well as minimum and maximum value of the parameter (i.e. /freq/min/1/max/300).

The starting point for each client is the 'connect' page.
If a new client wants to connect, it is first checked if a route is free.
If a route is free, the client is assigned to that route.
Then we ask for Accelerometer permission. If it is granted, the user is routed to the subpage and starts sending OSC-messages for the assigned parameter based on the accelerometer value of the x-axis.
If it is not granted, the user is routed to a free subpage but has a slider to change the value of the given parameter.

The main file for serving the clients is index.js in the root directory.

The main files for clients are in the /web directory.

Here we find the 'connect' page file in /connect.

The files for clients with accelerometer access are in /main_mobile.

The files for clients without accelerometer access are in /main_slider.

________________________________________________________________________________________________

## Installation

Make sure you have Node.js installed.

FIRST you need to create your own ssl-certificate using openssl.

1. Run <code>npm install</code> to install osc.js and all its dependencies.
2. Run <code>npm install</code> in the /web/main_mobile directory.
3. Run <code>npm install</code> in the /web/main_slider directory.

________________________________________________________________________________________________

## Usage

1. Start the Node application by running <code>sudo node .</code> in the root directory.
2. Open the webpage in your browser (local address: https://localhost:8443).
3. Receive and process incoming OSC messages via Max/MSP or SuperCollider on port 7500.
