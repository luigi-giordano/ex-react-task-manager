import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';

function App() {
  return (
    <BrowserRouter>

      <nav>
        <NavLink to="/" end>Lista delle Task</NavLink>
        <NavLink to="/addTask">Aggiungi una Task</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/addTask" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
