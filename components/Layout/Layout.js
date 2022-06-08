import styles from "./layout.module.css"
import Breadcrumbs from "../Breadcrumb/Breadcrumb";

export default function Layout({children, pathArray, page}) {
    return (
        <div className={styles.container}>
            <Breadcrumbs pathArray={pathArray} page={page}/>
            <div>
                {children}
            </div>
        </div>
    )
}
