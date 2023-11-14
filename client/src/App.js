import "tachyons/css/tachyons.css";
import { useState , useEffect } from "react"; 
import { Suspense } from "react";
import io from "socket.io-client";

import "./App.css";
import configs from "./configs";
import RouteCard from "./RouteCard";
import InfoBoard from "./InfoBoard";

const Loading = () => {
    return <div>Loading...</div>
}

const socket = io.connect(configs.serverAddress);

function App() {
    const [routeCards, setRouteCards] = useState([]);

    let info = configs.initInfo;

    useEffect(() => {
        fetch(`${configs.serverAddress}/routes`)
        .then(res => res.json())
        .then(data => setRouteCards(data))
        .catch(error => alert(error))
    }, []);

    return (
        <div className="tc ma5 f3">
            <h1>E-baton</h1>
            <InfoBoard info={info}/>
            <Suspense fallback={<Loading />}>
            {
                routeCards.map((el, i)=> {return (
                    <RouteCard id={el.id} name={el.name} events={el.events} occupied={el.occupied} socket={socket} />
                )})
            }
            </Suspense>
        </div>
    );
}

export default App;