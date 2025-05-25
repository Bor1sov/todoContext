import { useTasks } from '../context/TaskContext';

function AddTask({ newTask, setNewTask }) {
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Добавить новую задачу..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddTask;