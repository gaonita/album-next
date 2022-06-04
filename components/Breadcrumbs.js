import Link from "next/link";

const Breadcrumbs = ({pathArray}) => {
    return (
        <div style={{background:'#ececed', borderRadius:4, padding:'0 16px'}}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        pathArray?.map(({path, label},i)=>
                            <li key={i} className="breadcrumb-item" style={{padding:'4px'}}>
                                <Link href={path}>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        )
                    }
                </ol>
            </nav>
        </div>
    )
};

export default Breadcrumbs;
