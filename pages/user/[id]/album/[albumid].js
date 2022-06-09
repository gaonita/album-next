import {useCallback, useEffect, useState} from "react";
import {getUsersWithAlbums} from "../../../api/api";
import Layout from "../../../../components/Layout/Layout";
import Photo from "../../../../components/Photo/Photo";
import styles from './albumDetail.module.css'
import PhotoPreview from "../../../../components/PhotoPreview/PhotoPreview";

const AlbumDetailHeader = ({title, length}) => (
    <div className={styles.albumDetail}>
        <h1>{title}</h1>
        <p className={styles.albumLengthText}>{length} photos</p>
    </div>
)

export default function AlbumDetail({user, album}) {
    const pathArray = [{path: '/', label: 'User'},
        {path: `/user/${user?.id}`, label: `${user?.name}`},
        {path: `/user/${user?.id}/album/${album?.id}`, label: `${album?.title}`}]
    const totalPhotos = album?.photos.length;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(-1)

    const onClickPhoto = (photoIndex) => {
        setCurrentPhotoIndex(photoIndex)
        document.body.style.overflow = 'hidden';
    }
    const onClose = () => {
        setCurrentPhotoIndex(-1)
        document.body.style.overflow = '';
    }

    const moveToPrevious = useCallback(() => {
        setCurrentPhotoIndex(prev => {
            if (prev > 0) {
                return prev - 1
            } else {
                setCurrentPhotoIndex(totalPhotos - 1)
                return currentPhotoIndex
            }
        })
    }, [currentPhotoIndex, totalPhotos])

    const moveToNext = useCallback(() => {
        setCurrentPhotoIndex(prev => {
            if (prev < totalPhotos - 1) {
                return prev + 1
            } else {
                setCurrentPhotoIndex(0)
                return currentPhotoIndex
            }
        })
    }, [currentPhotoIndex, totalPhotos])

    useEffect(() => {
        window.onkeydown = (event) => {
            switch (event.code) {
                case "ArrowRight":
                    moveToNext();
                    break;
                case "ArrowLeft":
                    moveToPrevious();
                    break;
                case "Escape":
                    onClose();
                    break;
                default:
                    break;
            }
        }
        return (() => {
            window.onkeydown = null
        })
    }, [moveToPrevious, moveToNext])

    return (
        user && album &&
        <Layout pathArray={pathArray}>
            <AlbumDetailHeader title={album.title}
                               length={totalPhotos}/>
            {
                currentPhotoIndex !== -1 &&
                <PhotoPreview currentPhotoIndex={currentPhotoIndex}
                              onClose={onClose}
                              totalPhotos={totalPhotos}
                              moveToPrevious={moveToPrevious}
                              moveToNext={moveToNext}/>
            }
                <div className={styles.photosContainer}>
                    {
                        album.photos.map((p, i) =>
                            <Photo
                                key={p.id}
                                photo={p}
                                index={i}
                                open={currentPhotoIndex === i}
                                onClick={() => onClickPhoto(i)}/>
                        )
                    }
                </div>
        </Layout>
    )
}

export async function getStaticProps({params}) {
    const allUsers = await getUsersWithAlbums() || []
    return {
        props: {
            user: allUsers.find(u => u.id === params.id - 0),
            album: allUsers.find(u => u.id === params.id - 0).albums.find(a => a.id === params.albumid - 0)
        },
    }
}

export async function getStaticPaths() {
    const allUsers = await getUsersWithAlbums()
    const userIdWithAlbums = allUsers.flatMap(u => u.albums.map(a => ({userId: u.id, albumId: a.id})))
    return {
        paths: userIdWithAlbums.map(i => `/user/${i.userId}/album/${i.albumId}`),
        fallback: true,
    }
}
