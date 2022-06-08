import Link from 'next/link'
import Image from 'next/image'
import styles from './userCard.module.css'
import Star from '../../../../assets/star.svg'
import StarFilled from '../../../../assets/starFilled.svg'


export default function UserCard({path, user, favorite, onClickStar}) {
    return (
        <div className={styles.userCard}>
            <div className={styles.NameContainer}>
                <Link href={path}>
                    <p className={styles.userName}>{user.name}</p>
                </Link>
                <button className={styles.star}
                        onClick={onClickStar}>
                    <Image src={favorite ? StarFilled : Star}
                           alt={'star'}
                           width={22}
                           height={22}/>
                </button>
            </div>

            <Link href={path}>
                <div className={styles.userInfoContainer}>
                    <p className={styles.userInfo}>{user.company.name}</p>
                    <p className={styles.userInfo}>{user.email}</p>
                </div>
            </Link>
        </div>
    )
}
