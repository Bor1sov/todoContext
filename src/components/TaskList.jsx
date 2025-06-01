import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasks } from '../store/tasksSlice';
import { setSearchTerm } from '../store/uiSlice';
import TaskItem from './TaskItem';

function TaskList() {
  const dispatch = useDispatch();
  const { items: tasks, loading } = useSelector((state) => state.tasks);
  const { searchTerm, sortAlphabetically } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = sortAlphabetically
    ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

  if (loading) {
    return <p className="loading">Загрузка задач...</p>;
  }

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;