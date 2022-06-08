import styles from "./navigations.module.css"
import Image from "next/image";
import arrowLeft from "../../../assets/arrowLeft.svg";
import arrowRight from "../../../assets/arrowRight.svg";

export default function Navigations({moveToPrevious, moveToNext}) {
    return (
        <div className={styles.arrowsContainer}>
            <div className={styles.arrowButton}
                 onClick={moveToPrevious}>
                <Image src={arrowLeft} alt={'left'} width={45} height={45}/>
            </div>
            <div className={styles.arrowButton}
                 onClick={moveToNext}>
                <Image src={arrowRight} alt={'left'} width={45} height={45}/>
            </div>
        </div>
    )
}
