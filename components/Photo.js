import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";

import styles from "../styles/Home.module.css";

export default function Photo({photo, open, onClick}) {
    useEffect(() => {
        if (open) {
            const rect = photoRef.current.getBoundingClientRect()
            const x = rect.x + rect.width / 2;
            const y = rect.y + rect.height / 2;
            setMoveToX(window.innerWidth / 2 - x);
            setMoveToY(window.innerHeight / 2 - y);
        } else {
            setMoveToX(0);
            setMoveToY(0);
        }
    }, [open])

    const photoRef = useRef();
    const [moveToX, setMoveToX] = useState(0)
    const [moveToY, setMoveToY] = useState(0)


    return (
        photo&&
        <div className={styles.photo}
             ref={photoRef}
             onClick={onClick}
             style={{
                 margin: 8,
                 display:'flex',
                 flexDirection:'column',
                 transform: `translate(${moveToX}px, ${moveToY}px) scale(${open ? 2 : 1})`,
                 transition: `transform 300ms linear`,
                 zIndex: open ? 10 : 0,
             }}>
            <img alt={'img'} src={photo.url} width={290} height={290}/>
            <p style={{
                padding:8,
                fontSize: '0.5rem',
                display: open ? "block" : "none",
                color:'white',
                alignSelf:'center',
            }}>{photo.title}</p>
        </div>
    )
}
