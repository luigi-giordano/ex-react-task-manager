import { useState, useRef, useMemo, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {

    const { addTask } = useContext(GlobalContext);
    const [taskTitle, setTaskTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();

    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim())
            return "Il nome della task non può essere vuoto."
        if ([...taskTitle].some(char => symbols.includes(char)))
            return "Il nome della task non può contenere caratteri speciali."
        return "";
    }, [taskTitle]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (taskTitleError)
            return;

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };
        try {
            await addTask(newTask);
            alert("Task aggiunta con successo!");
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
            <h1>Aggiungi una Task</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome Task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)} />
                </label>
                {taskTitleError &&
                    <p style={{ color: 'red' }}>{taskTitleError}</p>}
                <label>
                    Descrizione:
                    <textarea
                        ref={descriptionRef}
                    ></textarea>
                </label>
                <label>
                    Stato:
                    <select ref={statusRef} defaultValue="todo">
                        <option value="To do">Da Fare</option>
                        <option value="Doing">In Corso</option>
                        <option value="Done">Fatto</option>
                    </select>
                </label>
                <button type="submit" disabled={taskTitleError}>
                    Aggiungi Task
                </button>
            </form>
        </div>
    )
}