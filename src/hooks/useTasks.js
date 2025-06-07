// Importa gli hook useState e useEffect da React per gestire stato e effetti collaterali
import { useState, useEffect } from "react";

// Recupera la variabile d'ambiente VITE_API_URL dal file .env tramite import.meta.env
const { VITE_API_URL } = import.meta.env;

// Custom hook chiamato useTasks, che gestisce la logica per le operazioni sulle task
export default function useTasks() {

    // Stato locale per memorizzare l'array delle task
    const [tasks, setTasks] = useState([]);

    // useEffect con array di dipendenze vuoto: esegue la fetch solo al montaggio del componente
    useEffect(() => {
        // Richiesta GET (implicita) per prendere tutte le task dall'API
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())      // Parsing della risposta in formato JSON
            .then(data => setTasks(data)) // Salva i dati ottenuti nello stato tasks
            .catch(err => console.error(err)); // Log di eventuali errori
    }, []);

    // Funzione asincrona per aggiungere una nuova task
    const addTask = async newTask => {
        // Effettua una richiesta POST all'endpoint /tasks 
        const response = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Header per specificare JSON
            body: JSON.stringify(newTask)                    // Converte newTask in stringa JSON
        });

        // Parsing della risposta JSON che contiene success, message e task
        const { success, message, task } = await response.json();

        // Se la risposta non contiene success, crea un errore personalizzato
        if (!success) throw new Error(message);

        // Aggiunge la nuova task allo stato, mantenendo le task precedenti
        setTasks(prevTasks => [...prevTasks, task]);
    }

    // Funzione asincrona per rimuovere una task dato il suo ID
    const removeTask = async taskId => {
        // Effettua una richiesta DELETE all'endpoint /tasks/:id per eliminare la task
        const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        // Parsing della risposta JSON con success e message
        const { success, message } = await response.json();

        // Se la risposta non contiene success, crea un errore personalizzato
        if (!success) throw new Error(message);

        // Aggiorna lo stato eliminando la task con l'ID specificato
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }

    // Funzione asincrona per aggiornare una task esistente
    const updateTask = async newUpdatedTask => {
        // Effettua una richiesta PUT all'endpoint /tasks/:id con i dati aggiornati
        const response = await fetch(`${VITE_API_URL}/tasks/${newUpdatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },  // Header per specificare JSON
            body: JSON.stringify(newUpdatedTask)              // Converte newTask in stringa JSON
        });

        // Parsing della risposta JSON che contiene success, message e task aggiornato
        const { success, message, task: newTask } = await response.json();

        // Se la risposta non contiene success, crea un errore personalizzato
        if (!success) throw new Error(message);

        // Aggiorna lo stato sostituendo la task vecchia con quella aggiornata utilizzando un ternario
        setTasks(prevTasks => prevTasks.map(oldTask => oldTask.id === newTask.id ? newTask : oldTask));
    }

    // Restituisce un oggetto con le task correnti e le funzioni per aggiungere, rimuovere e aggiornare le task
    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    };
}
