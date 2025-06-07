// Importa memo da React per ottimizzare il rendering del componente (evita rendering inutili se props non cambiano)
import { memo } from 'react';
// Importa Link da react-router-dom per navigazione interna senza ricaricare la pagina
import { Link } from 'react-router-dom';

// Definisce il componente TaskRow che prende in input una singola task come prop
// Il componente è "memorizzato" per evitare rendering inutili se la task non cambia
const TaskRow = memo(({ task }) => {

    // Crea la classe CSS per lo stato della task: rimuove spazi e converte tutto in minuscolo
    // es. "To do" -> "todo", "Doing" -> "doing", "Done" -> "done"
    const statusCLassName = task.status.replace(" ", "").toLowerCase();

    return (
        <tr>
            {/* Link alla pagina dettaglio task */}
            <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>

            {/* Cella con lo stato, con classe dinamica per colore o stile */}
            <td className={statusCLassName}>{task.status}</td>

            {/* Cella con la data di creazione, formattata in modo leggibile */}
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
})

export default TaskRow;