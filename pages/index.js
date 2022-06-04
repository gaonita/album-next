import Head from 'next/head'
import {getUsersWithAlbums} from "./api/api"
import Card from "../components/UserCard";
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import {useState} from "react";

export default function Home({allUsers}) {
    const [favorites, setFavorites] = useState([])
    const [userList, setUserList] = useState(allUsers)

    return (
        <Layout pathArray={[{path: '/', label: 'User'}]}>
            <Head>
                <title>Gaon Yang</title>
                <meta name="description" content="photo albums"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div>
                <h1>Favorites</h1>
                <hr className={styles.divider}/>
                <div className="row" style={{marginBottom: 60}}>
                    {favorites.map((u, i) =>
                        <Card onClickStar={() => {
                            setUserList([...userList, u])
                            setFavorites(favorites.filter(user => user.id !== u.id))
                        }}
                              favorite={true}
                              key={i}
                              path={`/user/${u.id}`}
                              user={u}/>
                    )}
                </div>

                <h1>Users</h1>
                <hr className={styles.divider}/>
                <div className="row align-items-start">
                    {userList.map((u, i) =>
                        <Card onClickStar={() => {
                            setFavorites([...favorites, u])
                            setUserList(userList.filter(user => user.id !== u.id))
                        }}
                              favorite={false}
                              key={i}
                              path={`/user/${u.id}`}
                              user={u}/>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const allUsers = await getUsersWithAlbums() || []
    return {
        props: {allUsers}
    }
}
