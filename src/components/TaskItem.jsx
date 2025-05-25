import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { toggleComplete, updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (editText.trim()) {
      updateTask(task.id, { title: editText });
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </>
      ) : (
        <>
          <span className="task-text">{task.title}</span>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Изменить</button>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;