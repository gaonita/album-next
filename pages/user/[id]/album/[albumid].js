import {getUsersWithAlbums} from "../../../api/api";
import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import Layout from "../../../../components/Layout";
import styles from '../../../../styles/Home.module.css'
import Photo from "../../../../components/Photo";
import closeIcon from "../../../../assets/close.svg";
import arrowLeft from "../../../../assets/arrowLeft.svg"
import arrowRight from "../../../../assets/arrowRight.svg"

export default function AlbumDetail({user, album}) {

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
                alert('first photo')
                return prev
            }
        })
    }, [])

    const moveToNext = useCallback(() => {
        setCurrentPhotoIndex(prev => {
            if (prev < album.photos.length - 1) {
                return prev + 1
            } else {
                alert('last photo')
                return prev
            }
        })
    }, [album?.photos.length])

    useEffect(() => {
        window.onkeydown = (event) => {
            switch (event.code) {
                case "ArrowRight":
                    moveToNext();
                    break;
                case "ArrowLeft":
                    moveToPrevious();
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
        <Layout pathArray={[{path: '/', label: 'User'}, {
            path: `/user/${user.id}`,
            label: `${user.name}`
        }, {path: `/user/${user.id}/album/${album.id}`, label: `${album.title}`}]}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '80px 0'
            }}>
                <h1>{album.title}</h1>
                <p>{album.photos.length} photos</p>
            </div>
            <div style={{
                display: currentPhotoIndex !== -1 ? "flex" : "none",
                flexDirection: 'column',
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: 'rgba(0,0,0,0.8)',
                zIndex: 1,

            }}>
                <div style={{
                    padding: 36,
                    alignSelf: 'flex-end',
                    zIndex: 2
                }}
                     onClick={onClose}>
                    <Image src={closeIcon} alt={`photo`} width={36} height={36}
                           style={{cursor: 'pointer'}}/>
                </div>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    position: 'absolute'
                }}>

                    <div style={{cursor: 'pointer'}}
                         onClick={moveToPrevious}>
                        <Image src={arrowLeft} alt={'left'} width={50} height={50}/>
                    </div>

                    <div style={{cursor: 'pointer'}}
                         onClick={moveToNext}><Image src={arrowRight} alt={'left'} width={50} height={50}/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", alignItems: 'center', flexWrap: 'wrap'}}>

                {
                    album.photos.map((p, i) =>
                        <Photo
                            key={p.id}
                            photo={p}
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

