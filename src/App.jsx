import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Технічна практика', category: 'Навчання', desc: 'Виконати завдання 1 пункт 5', date: '2026-06-19', completed: false },
    { id: 2, name: 'Мій власний стиль', category: 'Робота', desc: 'Переробити дизайн інтерфейсу на чистий CSS', date: '2026-06-20', completed: false }
  ]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Робота');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!name || !desc) return;
    const newTask = {
      id: Date.now(),
      name,
      category,
      desc,
      date,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setName('');
    setDesc('');
    setDate('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center' }}>Мій трекер завдань</h1>
      
      {/* Форма додавання завдання */}
      <form onSubmit={addTask} className="task-form">
        <div className="form-row">
          <div>
            <label>Назва:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Що зробити?" />
          </div>
          <div>
            <label>Категорія:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Робота">Робота</option>
              <option value="Навчання">Навчання</option>
              <option value="Особисте">Особисте</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Опис:</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows="2" placeholder="Деталі завдання..."></textarea>
        </div>
        <div className="form-group">
          <label>Дедлайн:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit" className="btn-submit">Додати до списку</button>
      </form>

      {/* Таблиця завдань */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Статус</th>
              <th>Категорія</th>
              <th>Назва</th>
              <th>Опис</th>
              <th>Дедлайн</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className={task.completed ? 'completed-row' : ''}>
                <td style={{ textAlign: 'center' }}>
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: 'auto' }} />
                </td>
                <td>
                  <span className="badge">{task.category}</span>
                </td>
                <td className={task.completed ? 'line-through' : ''} style={{ fontWeight: '500' }}>
                  {task.name}
                </td>
                <td className={task.completed ? 'line-through' : ''}>
                  {task.desc}
                </td>
                <td style={{ color: '#ef4444', fontSize: '15px' }}>{task.date}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => deleteTask(task.id)} className="btn-delete">Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
