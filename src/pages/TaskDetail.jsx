import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal"

export default function TaskDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!task) {
        return <h2>Task non trovata!</h2>;
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata con successo!");
            navigate("/");
        } catch (error) {
            console.error("Errore durante l'eliminazione del task:", error);
            alert(error.message);
        }
    }

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p><strong>Nome:</strong>{task.title}</p>
            <p><strong>Descrizione:</strong>{task.description}</p>
            <p><strong>Stato:</strong>{task.status}</p>
            <p><strong>Data di Creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>
            <button type="delete" onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
            <Modal
                title="Conferma Eliminazione"
                content={<p>Sei sicuro di voler eliminare la task?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina!"
            />
        </div>
    )
}