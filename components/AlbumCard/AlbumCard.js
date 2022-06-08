import Link from "next/link";
import styles from './albumCard.module.css'

export default function AlbumCard({path, album}) {
    return (
        <div className={styles.albumCard}>
            <Link href={path}>
                    <p className={styles.albumName}>{album.title}</p>
            </Link>
        </div>
    )
}
