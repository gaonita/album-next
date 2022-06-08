import Link from "next/link";
import styles from "./breadcrumb.module.css"

const Breadcrumb = ({pathArray}) => {
    return (
        <div className={styles.container}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{margin: 0}}>
                    {
                        pathArray?.map(({path, label}, i) => {
                            if (i !== pathArray.length - 1) {
                                return (
                                    <li key={i}
                                        className="breadcrumb-item"
                                        aria-current={"page"}>
                                        <Link href={path}>
                                            <a style={{textDecoration: "none"}}>
                                                {label}
                                            </a>
                                        </Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={i}
                                        className="breadcrumb-item active"
                                        aria-current={"page"}>
                                        {label}
                                    </li>
                                )
                            }
                        })
                    }
                </ol>
            </nav>
        </div>
    )
};

export default Breadcrumb;
