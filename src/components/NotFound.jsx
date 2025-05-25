import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link to="/" className="back-link">Вернуться на главную</Link>
    </div>
  );
}

export default NotFound;