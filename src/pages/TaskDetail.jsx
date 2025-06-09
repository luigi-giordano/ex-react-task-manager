// Importo i parametri dalla URL e la funzione per navigare tra le pagine
import { useParams, useNavigate } from "react-router-dom"
// Hook di stato e contesto globale
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
// Importa i componenti per il modale e la modifica della task
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetail() {

    // Hook per la navigazione tra le pagine
    const navigate = useNavigate();

    // Utilizzo hook useParams per accedere tramite 'id' ai parametri dinamici presenti nella URL
    const { id } = useParams();

    // Ottengo task, funzione per rimuovere e aggiornare task dal contesto globale
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    // Cerco la task corrispondente all'id
    const task = tasks.find(task => task.id === parseInt(id));

    // Stato per mostrare o nascondere il modale di eliminazione
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Stato per mostrare o nascondere il modale di modifica
    const [showEditModal, setShowEditModal] = useState(false);

    // Se la task non esiste, mostra un messaggio di errore
    if (!task) {
        return <h2>Task non trovata!</h2>;
    }

    // Funzione che gestisce l'eliminazione della task
    const handleDelete = async () => {
        try {
            await removeTask(task.id); // Rimuove la task
            alert("Task eliminata con successo!");
            navigate("/"); // Torna alla home
        } catch (error) {
            console.error("Errore durante l'eliminazione del task:", error);
            alert(error.message); // Mostra errore
        }
    }

    // Funzione che gestisce l'aggiornamento della task
    const handleUpdate = async newUpdatedTask => {
        try {
            await updateTask(newUpdatedTask); // Aggiorna la task
            alert("Task modificata con successo!");
            setShowEditModal(false); // Chiude il modale di modifica
        } catch (error) {
            console.error("Errore durante l'aggiornamento del task:", error);
            alert(error.message); // Mostra errore
        }
    };

    return (
        <div>
            <h1>Dettaglio Task</h1>

            {/* Visualizzazione dettagli della task */}
            <p><strong>Nome:</strong>{task.title}</p>
            <p><strong>Descrizione:</strong>{task.description}</p>
            <p><strong>Stato:</strong>{task.status}</p>
            <p><strong>Data di Creazione:</strong>{new Date(task.createdAt).toLocaleDateString()}</p>

            {/* Pulsante per aprire il modale di eliminazione */}
            <button type="delete" onClick={() => setShowDeleteModal(true)}>Elimina Task</button>

            {/* Pulsante per aprire il modale di modifica */}
            <button type="delete" onClick={() => setShowEditModal(true)}>Modifica Task</button>

            {/* Modale di conferma eliminazione */}
            <Modal
                title="Conferma Eliminazione"
                content={<p>Sei sicuro di voler eliminare la task?</p>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina!"
            />

            {/* Modale per la modifica della task */}
            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}
