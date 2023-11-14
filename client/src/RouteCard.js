import { useState , useEffect } from "react";

import RouteManager from "./RouteManager";

const cardColors = {
    available: 'bg-light-blue',
    connected: 'bg-light-red',
    occupied:  'bg-light-gray',
};

const fontTypes = {
    available: '',
    connected: '',
    occupied:  'strike',
};

function RouteCard({ id, name, events, occupied, socket }) {
    const [connected, setConnected] = useState(false); // If the route is connected to the server
    const [granted, setGranted] = useState(false); // If the permission to access device motion granted

    const cardColor = occupied ? 'occupied' : connected ? 'connected' : 'available';
    const fontType  = occupied ? 'occupied' : connected ? 'connected' : 'available';

    useEffect(() => {
        socket.on('released', (msg) => {
            if (msg === id) {
                setConnected(false);
            }
        });
        socket.on('occupied', (msg) => {
            if (msg === id) {
                setConnected(true);
            }
        });
    });

    const processClick = () => {
        if (occupied) return;
        // Due to the browser security policies of IOS 13+ and some other platform 
        // requestPermession must be inside a UI callback function :(
        if (!granted) {
            requestPermission(socket); 
            // return;
        }
        // click twice, the first click is for requesting permission
        const message = connected ? 'toRelease' : 'toOccupy';
        socket.emit(message, id);
    };

    const requestPermission = () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
            .then((state) => {
            if (state === 'granted') {
                setGranted(true);
                socket.emit('message', "INFO: DeviceMotionEvent permission granted");
            }
            else {
                socket.emit('message', "INFO: DeviceMotionEvent permission request failed");
            }
            }).catch(console.error); 
        }
        else{
            socket.emit('message', "INFO: DeviceMotionEvent doesn't supprt.");
        }
    };

    return (
        <div 
            className={`${cardColors[cardColor]} ma2 pa2 br3 dib grow bw3 shadow-5`}  
            onClick={processClick}
        >
            <p className={`${fontTypes[fontType]}`}> {name} </p> 
            <RouteManager granted={granted} connected={connected} name={name} events={events} socket={socket}/> 
        </div>
    );
}

export default RouteCard;