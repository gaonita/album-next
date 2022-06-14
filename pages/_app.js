import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, {useEffect, useState} from "react";

export const AppContext = React.createContext({windowWidth: 0, windowHeight: 0})

function MyApp({Component, pageProps}) {
    useEffect(() => {
        window.onresize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            setWindowDimension({windowWidth, windowHeight})
        }
        setWindowDimension({windowWidth: window.innerWidth, windowHeight: window.innerHeight})
    }, [])

    const [windowDimension, setWindowDimension] = useState({windowWidth: 0, windowHeight: 0})

    return <AppContext.Provider value={windowDimension}>
        <Component {...pageProps} />
    </AppContext.Provider>
}

export default MyApp

