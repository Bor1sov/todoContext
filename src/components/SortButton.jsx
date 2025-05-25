import { useTasks } from '../context/TaskContext';

function SortButton() {
  const { sortAlphabetically, setSortAlphabetically } = useTasks();

  return (
    <button
      className={`sort-btn ${sortAlphabetically ? 'active' : ''}`}
      onClick={() => setSortAlphabetically(!sortAlphabetically)}
    >
      {sortAlphabetically ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
    </button>
  );
}

export default SortButton;