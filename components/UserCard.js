import Link from 'next/link'
import Image from 'next/image'
import Star from '../assets/star.svg'
import StarFilled from '../assets/starFilled.svg'
import styles from '../styles/Home.module.css'


export default function UserCard({path, user, favorite, onClickStar}) {
    return (
        <div className={styles.userCard}>
            <div style={{display: 'flex', padding: '16px 4px 0', alignItems: 'center', justifyContent: 'space-between'}}>
                <Link href={path}>
                    <p className={styles.userName}>{user.name}</p>
                </Link>
                <button className={styles.star}
                        onClick={onClickStar}>
                    <Image src={favorite ? StarFilled : Star} alt={'star'} width={22} height={22}/>
                </button>
            </div>
            <Link href={path}>
                <div style={{padding: '0 4px 16px',}}>
                    <p style={{margin: 0}}>{user.company.name}</p>
                    <p style={{margin: 0}}>{user.email}</p>
                </div>
            </Link>
        </div>
    )
}
