import Head from 'next/head'
import {getUsersWithAlbums} from "./api/api"
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout/Layout";
import Users from "../components/Users/Users";
import useStorage from "../hooks/storage";

const PageHead = () => (
    <Head>
        <title>Gaon Yang</title>
        <meta name="description" content="photo albums"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
    </Head>
)

export default function Home({allUsers}) {
    const pathArray = [{path: '/', label: 'User'}]
    const [favorites, storeData] = useStorage('favoriteList', [])
    return (
        <Layout pathArray={pathArray}>
            <PageHead/>
            <div className={styles.usersContainer}>
                <Users title='Favorites'
                       favorite={true}
                       userList={allUsers.filter(u => favorites.includes(u.id))}
                       onClickStar={(u) => storeData(favorites.filter(i => u.id !== i))}/>

                <Users title='Users'
                       favorite={false}
                       userList={allUsers.filter(u => !favorites.includes(u.id))}
                       onClickStar={(u) => storeData([...favorites, allUsers.find(user => user.id === u.id).id])}/>
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
