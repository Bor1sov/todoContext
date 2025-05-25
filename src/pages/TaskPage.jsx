import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`);
        if (!response.ok) {
          navigate('/404');
          return;
        }
        const data = await response.json();
        setTask(data);
        setEditText(data.title);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        navigate('/404');
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editText,
        }),
      });
      const updatedTask = await response.json();
      setTask(updatedTask);
      setEditMode(false);
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });
      navigate('/');
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const toggleComplete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });
      const updatedTask = await response.json();
      setTask(updatedTask);
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
    }
  };

  if (loading) {
    return <p className="loading">Загрузка задачи...</p>;
  }

  return (
    <div className="task-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
      
      <div className="task-details">
        {editMode ? (
          <div className="edit-form">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows="4"
            />
            <div className="edit-actions">
              <button onClick={handleUpdate}>Сохранить</button>
              <button onClick={() => setEditMode(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h2>
            <div className="task-status">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={toggleComplete}
                />
                Выполнено
              </label>
            </div>
            <div className="task-actions">
              <button onClick={() => setEditMode(true)}>Редактировать</button>
              <button onClick={handleDelete} className="delete-button">
                Удалить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskPage;