import {useCallback, useEffect, useState} from "react";

export default function useStorage(key, defaultValue) {
    const [data, setData] = useState(defaultValue)

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem(key)) || defaultValue)
    }, [key])

    const storeData = useCallback((newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
        setData(newData)
    }, [key]);
    return [data, storeData]
}
