import { useState, useEffect, useCallback } from 'react';
import AddTask from '../components/AddTask';
import SearchAndSort from '../components/SearchAndSort';
import TaskList from '../components/TaskList';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  const API_URL = 'http://localhost:3000/todos';

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskText) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskText,
          completed: false,
        }),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Ошибка добавления:', error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = sortAlphabetically
    ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (term) => {
    debouncedSearch(term);
  };

  return (
    <div className="home-page">
      <h1>Список дел</h1>
      
      <AddTask onAdd={addTask} />
      
      <SearchAndSort 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortAlphabetically={sortAlphabetically}
        onSortToggle={() => setSortAlphabetically(!sortAlphabetically)}
      />

      {loading ? (
        <p className="loading">Загрузка задач...</p>
      ) : (
        <TaskList tasks={sortedTasks} />
      )}
    </div>
  );
}

export default HomePage;