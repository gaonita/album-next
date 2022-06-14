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
        fallback: false,
    }
}
// If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
//fallback: true is useful if your app has a very large number of static pages that depend on data (such as a very large e-commerce site).
// If you want to pre-render all product pages, the builds would take a very long time.
// Instead, you may statically generate a small subset of pages and use fallback: true for the rest.
// When someone requests a page that is not generated yet, the user will see the page with a loading indicator or skeleton component.
