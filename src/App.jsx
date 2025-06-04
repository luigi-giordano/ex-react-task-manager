import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav>
          <NavLink to="/" end>Lista delle Task</NavLink>
          <NavLink to="/addTask">Aggiungi una Task</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
