import {getUsersWithAlbums} from "../../api/api";
import Link from "next/link";
import Layout from "../../../components/Layout";
import AlbumCard from "../../../components/AlbumCard";

export default function UserDetail({user}) {
    return (
        user &&
        <Layout pathArray={[{path: '/', label: 'User'}, {path: `/user/${user.id}`, label: `${user.name}`}]}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',margin:'80px 0'}}>
                <h1 style={{fontWeight:'bold'}}>{user.name}</h1>
                <div style={{maxWidth:'50rem', margin:16, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <p style={{margin:10}}>{user.company.name}</p>
                    <hr style={{width:30, margin:10, borderTop:'1px solid black'}}/>
                    <p style={{margin:10}}>{user.email}</p>
                    <hr style={{width:30,margin:10,borderTop:'1px solid black'}}/>
                    <p style={{margin:10}}>{user.address.street}, {user.address.city} </p>
                </div>
            </div>
            <h1>Albums</h1>
            <div className="row" style={{marginBottom: 60}}>
                {
                    user.albums.map((a, i) =>
                        <AlbumCard key={i}
                                   path={`/user/${user.id}/album/${a.id}`}
                                   prop={a}/>
                    )}
            </div>
        </Layout>
    )
}


export async function getStaticProps({params}) {
    const allUsers = await getUsersWithAlbums() || []

    const userIdInt = parseInt(params.id)

    return {
        props: {
            user: allUsers.find(u => u.id === userIdInt),
        },
    }
}

export async function getStaticPaths() {
    const allUsers = await getUsersWithAlbums()

    return {
        paths: allUsers?.map((u) => `/user/${u.id}`) || [],
        fallback: true,
    }
}
