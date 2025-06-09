// Importo useState e useRef da React per gestire stato e riferimenti DOM
import { useState, useRef } from 'react';
// Importa il componente Modal
import Modal from './Modal';

// Componente EditTaskModal, modale per modificare una task esistente
// Props: show, onClose, task, onSave
export default function EditTaskModal({ show, onClose, task, onSave }) {

    // Stato locale per contenere la task modificata, inizializzato con la task
    const [editTask, setEditTask] = useState(task);

    // Ref al form per poter invocare il submit da codice
    const editFormRef = useRef();

    // Funzione per aggiornare una proprietà specifica della task modificata
    // riceve la chiave da modificare e l'evento input, aggiorna lo stato con spread operator
    const changeEditedTask = (key, event) => {
        setEditTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    // Funzione che previene il comportamento di default e richiama onSave con i dati aggiornati
    const handleSubmit = e => {
        e.preventDefault();
        onSave(editTask);
    }

    // Destrutturazione  delle proprietà title, description e status dalla task modificata per usarle nel form
    const { title, description, status } = editTask;

    return (
        // Usa il componente Modal con le props specifiche
        <Modal
            title="Modifica Task" // Titolo modale
            content={
                // Form per modificare la task
                <form
                    ref={editFormRef} // assegna il ref per poterlo richiamare da fuori
                    onSubmit={handleSubmit} // gestione submit
                >
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={title}
                            onChange={e => changeEditedTask('title', e)} // aggiorna titolo
                        />
                    </label>

                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={e => changeEditedTask('description', e)} // aggiorna descrizione
                        />
                    </label>

                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={e => changeEditedTask('status', e)} // aggiorna stato
                        >
                            {['To do', 'Doing', 'Done'].map((value, index) => (
                                <option
                                    value={value}
                                    key={index}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            confirmText='Salva' // testo del bottone conferma
            show={show} // mostra/nasconde la modale
            onClose={onClose} // funzione per chiudere la modale
            onConfirm={() => editFormRef.current.requestSubmit()} // Al click conferma richiama la submit del form tramite il ref (usa requestSubmit che supporta validazione)
        />
    )
}
