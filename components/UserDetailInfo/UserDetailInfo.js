import styles from "./userDetailInfo.module.css";

const UserDetailInfo = ({user}) => (
    <div className={styles.userDetailContainer}>
        <h1>{user.name}</h1>
        <div className={styles.userDetails}>
            <p className={styles.userDetailText}>{user.company.name}</p>
            <hr className={styles.userDetailDivider}/>
            <p className={styles.userDetailText}>{user.email}</p>
            <hr className={styles.userDetailDivider}/>
            <p className={styles.userDetailText}>{user.address.street}, {user.address.city} </p>
        </div>
    </div>
)

export default UserDetailInfo;
