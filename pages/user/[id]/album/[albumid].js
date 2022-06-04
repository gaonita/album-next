import {getUsersWithAlbums} from "../../../api/api";
import Image from "next/image";
import React, {useRef} from "react";
import Layout from "../../../../components/Layout";
import styles from '../../../../styles/Home.module.css'
import Photo from "../../../../components/Photo";


export default function AlbumDetail({user, album}) {

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
            <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>

                {
                    album.photos.map(p =>
                        <Photo key={p.id} photo={p}/>
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

