import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import styles from "./photo.module.css"

export default function Photo({photo,index, open, onClick}) {
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
        <div className={styles.photoContainer}
             ref={photoRef}
             onClick={onClick}
             style={{
                 transform: `translate(${moveToX}px, ${moveToY}px) scale(${open ? 2 : 1})`,
                 zIndex: open ? 2 : 0,
             }}>

            <Image alt={'img'}
                   src={`${photo.url}.png`}
                   blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrQcAAZ8BDlpDGcMAAAAASUVORK5CYII=`}
                   placeholder={"blur"}
                   width={300}
                   height={300}
            />

            <p className={styles.photoTitle}
                style={{display: open ? "block" : "none"}}>{photo.title}</p>
        </div>
    )
}
