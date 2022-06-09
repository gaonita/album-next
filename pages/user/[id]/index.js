import {getUsersWithAlbums} from "../../api/api";
import PageHead from "../../../components/PageHead/PageHead";
import Layout from "../../../components/Layout/Layout";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";
import UserDetailInfo from "../../../components/UserDetailInfo/UserDetailInfo";


export default function UserDetail({user}) {
    const pathArray = [{path: '/', label: 'User'}, {path: `/user/${user?.id}`, label: `${user?.name}`}];
    return (
        user &&
        <Layout pathArray={pathArray}>
            <PageHead page={'User Detail'}/>
            <UserDetailInfo user={user}/>
            <h1>Albums</h1>
            <div className="row">
                {
                    user.albums.map((a, i) =>
                        <AlbumCard key={i}
                                   path={`/user/${user.id}/album/${a.id}`}
                                   album={a}/>
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
