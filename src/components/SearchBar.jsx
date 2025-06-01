import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/uiSlice';
import { useState, useEffect } from 'react';

function SearchBar() {
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearchTerm));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, dispatch]);

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