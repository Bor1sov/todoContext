import { useDispatch, useSelector } from 'react-redux';
import { toggleSort } from '../store/uiSlice';

function SortButton() {
  const dispatch = useDispatch();
  const sortAlphabetically = useSelector((state) => state.ui.sortAlphabetically);

  return (
    <button
      className={`sort-btn ${sortAlphabetically ? 'active' : ''}`}
      onClick={() => dispatch(toggleSort())}
    >
      {sortAlphabetically ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
    </button>
  );
}

export default SortButton;