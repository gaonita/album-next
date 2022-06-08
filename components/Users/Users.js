import styles from "./users.module.css";
import UserCard from "./components/UserCard/UserCard";

const Users = ({title, userList, onClickStar, favorite}) => (
    <div className={styles.userCardsContainer}>
        <h1>{title}</h1>
        <hr className={styles.divider}/>
        <div className="row align-items-start">
            {userList.map((u, i) =>
                <UserCard onClickStar={() => onClickStar(u)}
                          favorite={favorite}
                          key={i}
                          path={`/user/${u.id}`}
                          user={u}/>
            )}
        </div>
    </div>
)

export default Users;
