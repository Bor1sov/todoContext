import { useTasks } from '../context/TaskContext';
import { useState, useEffect } from 'react';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useTasks();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        placeholder="Поиск задач..."
      />
    </div>
  );
}

export default SearchBar;