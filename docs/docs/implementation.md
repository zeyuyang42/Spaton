# Implementation

This section is intended primarily for course reports, and for someone interested in implementation details. Most people can ignore this section.

## 1 Client

Client is implemented using [React](https://react.dev/) and uses the lightweight [tachyons](https://tachyons.io/) toolkit to process CSS. It uses [socket.io-client](https://socket.io/docs/v4/client-api/) to manage the websocket connection between client and server.

Following js files in src folder are the main implementations:

`App.js`: The starting point of client functionalities

`InfoBoard.js`: Display the information according to status. For now this is just a static paragraph

`RouteCard.js`: The implementation of route card object. It process the logic and visual feedback of route cards.

`RouteManager.js`: Each route card equips a route manager object to deal with the communication with server using the client socket.

`WebEvents.js`: The json file to save mobile phone sensor event information. 

`configs.js`: configs file stores the general configurations of client, e.g IP&Port

------

The client intialize the socket at the very begining before render the frontend.  At the beginning of rendering it sends a https request to the server to get the current state of routes, then uses the response data to set the RouteCards state. All route card components are rendered according this state. All states and style of the route card is defined by the data from server.

The RouteCard component needs to process the click interaction. It will check if the permission to use DeviceMotionEvent has been granted. It will request the permission if still not granted. After the permission check, I will send message to the server to occupy or to release a route according to the connection state. The RouteCard will set the connection state based on the returned message from server. The corresponding route manager will start or stop sending messages to ther server according to the connection state. The route manager choose the callback functions for EventListener according to the Events field as explained in Usage section.

## 2 Server

Server relies on[ Express.js](https://expressjs.com/) to create the server. [socket.io](https://socket.io/) is the tool fo full duplex connection between the clients and the server. The server broadcasts [OSC](https://en.wikipedia.org/wiki/Open_Sound_Control) messages with help of the [osc.js](https://github.com/colinbdclark/osc.js/) library. 

Following js files in src folder are the main implementations:

`server.js`: All the main implementation is in the server.js file which includes Server Setup, Websockt Application, Https Application and OSC Application.

`configs.js`: configs file stores the general configurations of client, e.g IP&Port

`utils.js`: Some utility functions

------

The server loads the preset when initialised. Then it setups the backend by creating express application, setting up https server, setting up websocket and listening to specific IP/Port. It also opens the udp port for broadcasting OSC messages. 

The server process messages from all socket from different clients. It creates a sperate socket channel when new connection established, and clean up the the occupied routes when disconnection detected. When the message to request occupy and release a route detected. The server looks up the state fields in the preset json to give corresponding feedbacks. The client keeps sending sensor data belongs a route. The server checks the socket id of all coming sensor data and process the data only when the socket.id matches the id in the state field. All accepted sensor data are then broadcasted using the udp port. 

## 3. Limitations

The implementation is still in a very early stage. It can only run inside specific LAN and there are still a lot of browsers and mobile phones to be tested. The implementation misses a robust throoughtout error control. The plan of the design was to make a seamless intergration from sensor data to spatial audio scenarios.  But there is still a very loose connection between the sensor processign system and spatial sound system. The unidirectional OSC connection makes the system indistinguishable from normal OSC control software in some cases. A very insight thought pointed by Dr.Henrik von Coler is that the underutilisation of multi-user connections. Theoretically it's possible to involve huge amout of clients into spatial composition. However, the design logic limits the maximum number to the number of route card. 

## 4. Future Work

Personally, I remain optimistic about the potential of the system and will continue to work on subsequent iterations to improve it. Based on the shortcomings mentioned above, here are some possible directions for further design.

- Optimise the code to improve the ability to handle feedback for all types of web problems. The code should be optimised to provide a level of interaction that is expected from a web application. 

- Re-engineer the way OSC addresses are organised and allow for automatic capacity management based on the information of the connected clients. Improve system integration by including feedback from the sound engine. 
- Create OSC process template  for all common audio engines
- Explore the ability to perform audio processing, especially spatial processing, directly on the server side in addition to OSC control signals.

















