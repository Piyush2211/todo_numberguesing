import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, priority: 'low', completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  const handleEditInputChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSaveEdit = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: editValue } : task
    );
    setTasks(updatedTasks);
    setEditId(null);
    setEditValue('');
  };

  const handlePriorityChange = (id, priority) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    );
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const handleShowCompleted = () => {
    setShowCompleted(true);
  };

  const handleCloseCompleted = () => {
    setShowCompleted(false);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={handleShowCompleted}>Show Completed Tasks</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ backgroundColor: task.completed ? 'green' : task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'blue' }}>
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handlePriorityChange(task.id, 'low')}>Low Priority</button>
                <button onClick={() => handlePriorityChange(task.id, 'medium')}>Medium Priority</button>
                <button onClick={() => handlePriorityChange(task.id, 'high')}>High Priority</button>
                {!task.completed && <button onClick={() => handleCompleteTask(task.id)}>Complete</button>}
              </>
            )}
          </li>
        ))}
      </ul>
      {showCompleted && (
        <div className="completed-list">
          <h2>Completed Tasks</h2>
          <button onClick={handleCloseCompleted}>Close</button>
          <ul>
            {tasks.filter(task => task.completed).map(task => (
              <li key={task.id} className="completed">
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
