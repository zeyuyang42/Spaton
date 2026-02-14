import { useState , useEffect } from "react";
import {WebEvents} from "./WebEvents";

function RouteManager({granted, connected, name, events, socket}) {
    const [listeners, setListeners] = useState([]);

    useEffect(() => {
        connected && granted ? startRouting() : stopRouting();
    }, [connected, granted, socket]);

    const startRouting = () => {
        const filteredWebEvents = WebEvents.filter((event) => events.includes(event.id));
        const newListeners = [];
        filteredWebEvents.forEach((el) => {
            const listenerName = el.name;
            const listenerFunc = webEventCallbacks[el.callback](socket, name);
            window.addEventListener(listenerName, listenerFunc, true);
            newListeners.push({ listenerName, listenerFunc });
        });
        setListeners((prevListeners) => [...prevListeners, ...newListeners]);
    };

    const stopRouting = () => {
        listeners.forEach((el) => {
            window.removeEventListener(el.listenerName, el.listenerFunc, true);
        });
        setListeners([]);
    };
}

const webEventCallbacks = {
    handleOrientationAlpha: (socket, name) => (event) => {
        const { alpha } = event;
        const oscMessage = {
            routeName: name,
            eventName: "alpha",
            value: alpha
        };
        socket.emit('osc',  oscMessage);
    },
    handleOrientationBeta: (socket, name) => (event) => {
        const { beta } = event;
        const oscMessage = {
            routeName: name,
            eventName: "beta",
            value: beta
        };
        socket.emit('osc',  oscMessage);
    },
    handleOrientationGamma: (socket, name) => (event) => {
        const { gamma } = event;
        const oscMessage = {
            routeName: name,
            eventName: "gamma",
            value: gamma
        };
        socket.emit('osc',  oscMessage);
    },
    handleAccelerationX: (socket, name) => (event) => {
        const { x } = event.acceleration;
        const oscMessage = {
            routeName: name,
            eventName: "x",
            value: x
        };
        socket.emit('osc',  oscMessage);
    },
    handleAccelerationY: (socket, name) => (event) => {
        const { y } = event.acceleration;
        const oscMessage = {
            routeName: name,
            eventName: "y",
            value: y
        };
        socket.emit('osc',  oscMessage);
    },
    handleAccelerationZ: (socket, name) => (event) => {
        const { z } = event.acceleration;
        const oscMessage = {
            routeName: name,
            eventName: "z",
            value: z
        };
        socket.emit('osc',  oscMessage);
    },
    handleShake: (socket, name) => (event) => {
        // var SHAKE_THRESHOLD = 2000;
        // var lastUpdate = new Date().getTime();
        // var last_x, last_y, last_z;

        //     const handleAcceleration = (event) => {
        //         var curTime = new Date().getTime();    
        //         const { x, y, z } = event.acceleration;
        //         if ((curTime - lastUpdate)> 200) {      
        //             var diffTime = curTime - lastUpdate;    
        //             lastUpdate = curTime;           
        //             var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;        
        //             // socket.emit('message',  "shaked!"); 
        //             if (speed > SHAKE_THRESHOLD) {    
        //                 socket.emit('message',  "shaked!");  
        //                 socket.emit('message',  speed); 
        //             }    
        //             last_x = x;    
        //             last_y = y;    
        //             last_z = z;    
        //         }  
        //     }
    },
}; 

export default RouteManager;





//     var SHAKE_THRESHOLD = 2000;
//     var lastUpdate = new Date().getTime();
//     var last_x, last_y, last_z;
// const handleShake = (socket) => (event) => {
//         const handleAcceleration = (event) => {
//             var curTime = new Date().getTime();    
//             const { x, y, z } = event.acceleration;
//             if ((curTime - lastUpdate)> 200) {      
//                 var diffTime = curTime - lastUpdate;    
//                 lastUpdate = curTime;           
//                 var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;        
//                 // socket.emit('message',  "shaked!"); 
//                 if (speed > SHAKE_THRESHOLD) {    
//                     socket.emit('message',  "shaked!");  
//                     socket.emit('message',  speed); 
//                 }    
//                 last_x = x;    
//                 last_y = y;    
//                 last_z = z;    
//             }  
//         }
// }



// const createShakeHandler = (socket, shakeThreshold = 2000) => {
//     let lastUpdate = new Date().getTime();
//     let last_x, last_y, last_z;
  
//     const handleAcceleration = (event) => {
//       const curTime = new Date().getTime();
//       const { x, y, z } = event.acceleration;
  
//       if (curTime - lastUpdate > 200) {
//         const diffTime = curTime - lastUpdate;
//         lastUpdate = curTime;
  
//         const speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
  
//         if (speed > shakeThreshold) {
//           socket.emit('message', "shaked!");
//           socket.emit('message', speed);
//         }
  
//         last_x = x;
//         last_y = y;
//         last_z = z;
//       }
//     };
  
//     return handleAcceleration;
//   };
  
//   const socket = /* Initialize your socket here */;
//   const shakeHandler = createShakeHandler(socket);
  
//   // Now you can use shakeHandler as the event handler
//   window.addEventListener('devicemotion', shakeHandler);








