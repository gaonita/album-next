import React, {useContext, useEffect, useRef, useState} from "react";
import Image from "next/image";
import styles from "./photo.module.css"
import {AppContext} from "../../pages/_app";

export default function Photo({photo, open, onClick}) {
    const {windowWidth, windowHeight} = useContext(AppContext)

    useEffect(() => {
        if (open) {
            const rect = photoRef.current.getBoundingClientRect()
            const x = photoRef.current.offsetLeft + photoRef.current.clientWidth / 2;
            const y = photoRef.current.offsetTop + photoRef.current.clientHeight / 2;
            setTransform(`translate(${windowWidth / 2 - x}px, ${windowHeight / 2 - y}px) scale(${open ? 2 : 1})`)
        } else {
            setTransform(`translate(0px,0px)`)
        }
    }, [open, windowWidth, windowHeight])

    const photoRef = useRef()
    const [transform, setTransform] = useState()

    return (
        photo&&
        <div className={styles.photoContainer}
             ref={photoRef}
             onClick={onClick}
             style={{
                 transform: transform,
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
