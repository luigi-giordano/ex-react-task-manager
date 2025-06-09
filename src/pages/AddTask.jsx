// Import dei React hook e del contesto globale
import { useState, useRef, useMemo, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

// Stringa di simboli speciali non ammessi nel nome della task
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {

    // Ottiene la funzione per aggiungere una task dal contesto globale
    const { addTask } = useContext(GlobalContext);

    // Stato per il titolo della task
    const [taskTitle, setTaskTitle] = useState("");

    // Riferimenti agli input non controllati per descrizione e stato
    const descriptionRef = useRef();
    const statusRef = useRef();

    // Calcola il messaggio di errore legato al titolo della task.
    // Validazione con useMemo assicura che questa funzione venga ricalcolata solo quando `taskTitle` cambia.
    const taskTitleError = useMemo(() => {

        // Se il titolo, rimosso degli spazi iniziali/finali, è vuoto...
        if (!taskTitle.trim())
            // ...ritorna un messaggio di errore: campo obbligatorio.
            return "Il nome della task non può essere vuoto.";

        // Converte il titolo in un array di caratteri e controlla se almeno uno di questi
        // è incluso nella stringa `symbols`
        if ([...taskTitle].some(char => symbols.includes(char)))
            // Ritorna un messaggio di errore per i caratteri non validi.
            return "Il nome della task non può contenere caratteri speciali.";

        // Se nessuna delle due condizioni sopra è vera, allora il titolo è valido.
        // Ritorna una stringa vuota per indicare che non ci sono errori.
        return "";

        // Dipendenza di useMemo che ricalcola solo quando `taskTitle` cambia.
    }, [taskTitle]);


    // Gestisce il submit del form
    const handleSubmit = async e => {
        e.preventDefault(); // Previene il comportamento di default del form
        if (taskTitleError) return; // Blocca l'invio se ci sono errori

        // Crea l'oggetto della nuova task
        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };

        // Prova ad aggiungere la task
        try {
            await addTask(newTask);
            alert("Task aggiunta con successo!");

            // Resetta i campi del form
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "";
        } catch (error) {
            console.error("Errore durante l'aggiunta della task:", error);
            alert("Si è verificato un errore durante l'aggiunta della task.");
        }
    }

    return (
        <div>
            {/* Titolo principale della pagina */}
            <h1>Aggiungi una Task</h1>

            {/* Form per aggiungere una nuova task */}
            <form onSubmit={handleSubmit}>

                {/* Campo input per il titolo della task */}
                <label>
                    Nome Task:
                    <input
                        type="text"
                        value={taskTitle} // Collega il valore dell'input allo stato `taskTitle`
                        onChange={e => setTaskTitle(e.target.value)} // Aggiorna lo stato quando l'utente digita
                    />
                </label>

                {/* Se esiste un errore di validazione, lo mostra in rosso */}
                {taskTitleError &&
                    <p style={{ color: 'red' }}>{taskTitleError}</p>
                }

                {/* Campo textarea per la descrizione della task */}
                <label>
                    Descrizione:
                    <textarea
                        ref={descriptionRef} // Usa una ref per accedere direttamente al valore senza stato
                    ></textarea>
                </label>

                {/* Selezione dello stato della task (To do, Doing, Done) */}
                <label>
                    Stato:
                    <select
                        ref={statusRef} //  ref
                        defaultValue="todo" // Imposta il valore predefinito
                    >
                        <option value="To do">Da Fare</option>
                        <option value="Doing">In Corso</option>
                        <option value="Done">Fatto</option>
                    </select>
                </label>

                {/* Pulsante per inviare il form */}
                <button
                    type="submit"
                    disabled={taskTitleError} // Evita l'invio se il titolo non è valido
                >
                    Aggiungi Task
                </button>
            </form>
        </div>
    )

}