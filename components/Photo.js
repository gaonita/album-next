import React, {useRef, useState} from "react";
import styles from "../styles/Home.module.css";

export default function Photo({photo}){
    const photoRef = useRef();
    const [x, setX] = useState();

    const movePhoto = () => {
       setX( photoRef.current.getBoundingClientRect().x)
    }

    return(
        <div className={styles.photo} ref={photoRef}
             onClick={movePhoto}
             style={{margin: 8,
             transform:'translateX(100px)'
             }} >
            <img alt={'img'} src={photo.url} width={290} height={290}/>
        </div>
    )
}
