import { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import SortButton from './components/SortButton';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');

  return (
    <div className="app">
      <h1>Список дел (Redux)</h1>
      <div className="controls">
        <AddTask newTask={newTask} setNewTask={setNewTask} />
        <SearchBar />
        <SortButton />
      </div>
      <TaskList />
    </div>
  );
}

export default App;