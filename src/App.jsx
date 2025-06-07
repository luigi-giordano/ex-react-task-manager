// Importazione dei componenti necessari da react-router-dom per la gestione del routing
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

// Importazione delle pagine/componenti principali dell'applicazione
import TaskList from './pages/TaskList';       // Pagina che mostra la lista delle task
import AddTask from './pages/AddTask';         // Pagina per aggiungere una nuova task
import TaskDetail from './pages/TaskDetail';   // Pagina per vedere il dettaglio di una task

// Importazione del provider per il contesto globale (stato condiviso)
import { GlobalProvider } from './context/GlobalContext';

// Componente principale dell'applicazione
function App() {
  return (
    // Wrappa tutta l'applicazione nel provider globale per fornire lo stato condiviso a tutti i componenti
    <GlobalProvider>
      {/* Componente BrowserRouter che abilita il routing usando la History API del browser */}
      <BrowserRouter>

        <nav>
          {/* NavLink crea un link attivo */}{/* 'end' assicura che il link sia attivo solo quando l'URL è esattamente "/" */}
          <NavLink to="/" end>Lista delle Task</NavLink>
          <NavLink to="/addTask">Aggiungi una Task</NavLink>
        </nav>

        {/* Definizione delle rotte dell'applicazione */}
        <Routes>
          {/* Route per la homepage che mostra il componente TaskList */}
          <Route path="/" element={<TaskList />} />

          {/* Route per aggiungere una nuova task che mostra il componente AddTask*/}
          <Route path="/addTask" element={<AddTask />} />

          {/* Route che mostra i dettagli di una task con id specifico  */}
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
