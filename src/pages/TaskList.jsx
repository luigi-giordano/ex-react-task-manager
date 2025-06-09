// Importo gli hook React e i moduli esterni necessari
import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"; // per accedere alle task condivise
import TaskRow from "../components/TaskRow"; // componente che mostra ogni singola task
import defaultDebounce from "../hooks/defaultDebounce"; // funzione debounce per input

export default function TaskList() {
    // Estrae le task dallo stato globale tramite context
    const { tasks } = useContext(GlobalContext);
    console.log('Task:', tasks); // debug

    // Stato per ordinamento e ricerca
    const [sortBy, setSortBy] = useState('createdAt'); // campo da ordinare
    const [sortOrder, setSortOrder] = useState(1);     // 1 = ascendente, -1 = discendente
    const [searchQuery, setSearchQuery] = useState(''); // testo della ricerca

    // Crea una funzione debounce per evitare che setSearchQuery venga richiamata troppo spesso
    const debouncedSetSearchQuery = useCallback(
        defaultDebounce(setSearchQuery, 500), // attende 500ms
        []
    );

    // Icona da mostrare accanto al titolo della colonna ordinata
    const sortIcon = sortOrder === 1 ? "⭣" : "⭡";

    // Gestione click su intestazioni tabella per ordinare
    const handleSort = (field) => {
        if (sortBy === field) {
            // se clicco di nuovo sullo stesso campo, inverto l'ordine
            setSortOrder(prev => prev * -1);
        } else {
            // altrimenti ordino per quel campo in modo ascendente
            setSortBy(field);
            setSortOrder(1);
        }
    }

    // useMemo per evitare di ricalcolare tasks se non cambiano
    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks] // copia dell'array originale
            .filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
            )
            .sort((a, b) => {
                let comparison;

                if (sortBy === 'title') {

                    comparison = a.title.localeCompare(b.title); // confronto alfabetico

                } else if (sortBy === 'status') {

                    const statusOption = ["To do", "Doing", "Done"]; // ordinamento personalizzato
                    const indexA = statusOption.indexOf(a.status);
                    const indexB = statusOption.indexOf(b.status);
                    comparison = indexA - indexB;

                } else if (sortBy === 'createdAt') {

                    // ordinamento cronologico
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    comparison = dateA - dateB;
                }

                return comparison * sortOrder; // applica ordine ascendente/discendente
            })
    }, [tasks, sortBy, sortOrder, searchQuery]);

    // Output della pagina
    return (
        <div>
            <h1>Lista delle Task</h1>

            {/* Campo di ricerca con debounce */}
            <input
                type="text"
                placeholder="Cerca una task.."
                onChange={e => debouncedSetSearchQuery(e.target.value)}
            />

            {/* Tabella che mostra l'elenco delle task */}
            <table>
                <thead>
                    <tr>
                        {/* Intestazione colonna "Nome" */}
                        <th onClick={() => handleSort('title')}>
                            {/* Quando viene cliccata, ordina le task per 'title' */}
                            Nome {/* Mostra l'icona di ordinamento se questa è la colonna attiva */}
                            {sortBy === "title" && sortIcon}
                        </th>

                        {/* Intestazione colonna "Status" */}
                        <th onClick={() => handleSort('status')}>
                            {/* Ordina per 'status' (To do, Doing, Done) */}
                            Status
                            {sortBy === "status" && sortIcon}
                        </th>

                        {/* Intestazione colonna "Data di Creazione" */}
                        <th onClick={() => handleSort('createdAt')}>
                            {/* Ordina per data di creazione */}
                            Data di Creazione
                            {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* Cicla l'elenco delle task filtrate e ordinate */}
                    {filteredAndSortedTasks.map(task => (
                        // Ogni riga della tabella viene gestita dal componente TaskRow
                        // Passa la singola task come prop
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>

        </div>
    )
}