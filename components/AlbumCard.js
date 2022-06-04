import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function AlbumCard({path, prop}) {
    return (
        <div className={'card text-bg-primary mb-3'}
             style={{maxWidth: '22rem', margin: '16px', padding:20, border: 'none', background: '#c6ddf6'}}>
            <Link href={path}>
                    <p className={styles.albumName}>{prop.title}</p>
            </Link>
        </div>
    )
}
