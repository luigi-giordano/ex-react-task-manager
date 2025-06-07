// Importa createContext da React per creare un contesto globale
import { createContext } from "react";

// Importa il custom hook useTasks che gestisce lo stato e le operazioni sulle task
import useTasks from "../hooks/useTasks";

// Crea ed esporta il contesto globale chiamato GlobalContext
export const GlobalContext = createContext();

// Componente provider globale che fornisce il contesto a tutti i componenti figli
export function GlobalProvider({ children }) {

    // Usa il custom hook useTasks per ottenere stato e funzioni sulle task
    const taskData = useTasks();

    // Restituisce il provider del contesto, passando il valore ottenuto da useTasks
    // In questo modo tutti i componenti figli avranno accesso a tasks, addTask, removeTask, updateTask
    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    );
}
