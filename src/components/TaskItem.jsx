import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/tasksSlice';

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleToggleComplete = () => {
    dispatch(updateTask({ id: task.id, updates: { completed: !task.completed } }));
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(updateTask({ id: task.id, updates: { title: editText } }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
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
            <button onClick={handleDelete}>Удалить</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;