import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
const { VITE_API_URL } = import.meta.env;

export function GlobalProvider({ children }) {

    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
}