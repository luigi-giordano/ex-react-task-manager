import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return <h2>Task non trovata!</h2>;
    }

    const handleDelete = () => {
        console.log('Eliminazione task con ID:', task.id);

    }

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p><strong>Nome:</strong>{task.title}</p>
            <p><strong>Descrizione:</strong>{task.description}</p>
            <p><strong>Stato:</strong>{task.status}</p>
            <p><strong>Data di Creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>
            <button type="delete" onClick={handleDelete}>Elimina Task</button>
        </div>
    )
}