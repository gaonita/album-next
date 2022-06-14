export async function fetchAPI(path) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}

export async function getUsersWithAlbums() {
// expensive; fetching data before you need, so loading time can be taking long
// to manipulate data structure like this!
// but nextJS does it in build time so end user wouldn't get affected.
    const users = await fetchAPI('users')
    const albums = await fetchAPI('albums')
    const photos = await fetchAPI('photos')
//to create path, need infos
//used in many pages, efficient to calculate once here => same function everywhere same data structure
    return users.map(u => ({
        ...u,
        albums: albums.filter(a => a.userId === u.id).map(a => ({
            ...a,
            photos: photos.filter(p => p.albumId === a.id)
        }))
    }))
}

