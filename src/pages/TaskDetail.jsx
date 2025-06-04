import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask);
            alert("Task modificata con successo!");
            setShowEditModal(false);
        } catch (error) {
            console.error("Errore durante l'aggiornamento del task:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p><strong>Nome:</strong>{task.title}</p>
            <p><strong>Descrizione:</strong>{task.description}</p>
            <p><strong>Stato:</strong>{task.status}</p>
            <p><strong>Data di Creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>
            <button type="delete" onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
            <button type="delete" onClick={() => setShowEditModal(true)}>Modifica Task</button>
            <Modal
                title="Conferma Eliminazione"
                content={<p>Sei sicuro di voler eliminare la task?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina!"
            />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}