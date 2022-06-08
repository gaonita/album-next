import styles from "./photoPreview.module.css";
import Image from "next/image";
import closeIcon from "../../assets/close.svg";
import Navigations from "./components/Navigations";

const PreviewUI = ({currentPhotoIndex, totalPhotos, onClick}) => (
    <div className={styles.previewHeader}>
        <div className={styles.closeButton}
             onClick={onClick}>
            <Image src={closeIcon}
                   alt={`photo`}
                   width={30}
                   height={30}/>
        </div>
        <p className={styles.indexIndicator}>
            {currentPhotoIndex + 1} / {totalPhotos}
        </p>
    </div>
)

const PhotoPreview = ({currentPhotoIndex, onClose, totalPhotos, moveToPrevious, moveToNext}) =>(
    <div className={styles.previewBackground}>
        <PreviewUI currentPhotoIndex={currentPhotoIndex}
                       onClick={onClose}
                       totalPhotos={totalPhotos}/>
        <Navigations moveToPrevious={moveToPrevious}
                     moveToNext={moveToNext}/>
    </div>
)

export default PhotoPreview;
