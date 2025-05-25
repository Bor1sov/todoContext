import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks, loading } = useTasks();

  if (loading) {
    return <p className="loading">Загрузка задач...</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;