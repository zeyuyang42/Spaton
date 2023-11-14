import { useState , useEffect } from "react"; //useEffect

function InfoBoard(props) {
    const [infomation, setInfomation] = useState("");
    
    useEffect(() => {
        setInfomation(props.info)
    }, [props.info])

    return (
            <p> {infomation} </p>
    )
}

export default InfoBoard