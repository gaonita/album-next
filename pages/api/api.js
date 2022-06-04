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

    const users = await fetchAPI('users')
    const albums = await fetchAPI('albums')
    const photos = await fetchAPI('photos')

    return users.map(u => ({
        ...u,
        albums: albums.filter(a => a.userId === u.id).map(a => ({
            ...a,
            photos: photos.filter(p => p.albumId === a.id)
        }))
    }))
}

