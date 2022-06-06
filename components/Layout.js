import Breadcrumbs from "./Breadcrumbs";

export default function Layout({children, pathArray}) {
    return (
        <div className={'container'} style={{padding: '40px'}}>
            <Breadcrumbs pathArray={pathArray}/>
            <div>
                {children}
            </div>
        </div>
    )
}
