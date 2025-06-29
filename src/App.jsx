import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Edit aur Delete icons
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);

  const submitTodo = (e) => {
    e.preventDefault();
    const Todo = e.target.todo.value.trim();

    if (Todo === "") {
      alert("Please enter a todo");
      return;
    }

    if (!todoList.includes(Todo)) {
      setTodoList([...todoList, Todo]);
      e.target.todo.value = ""; 
    } else {
      alert("This todo already exists");
    }
  };

  const removeTodo = (index) => {
    const newTodos = todoList.filter((_, i) => i !== index);
    setTodoList(newTodos);
  };

  const updateTodo = (index, newValue) => {
    const newTodos = [...todoList];
    newTodos[index] = newValue;
    setTodoList(newTodos);
  };

  return (
    <div className='container'>
      <h1>To - Do - List</h1>
      <form onSubmit={submitTodo}>
        <input type="text" name='todo' placeholder='Enter your To-Do' />
        <button type="submit">SAVE</button>
      </form>
      <div className='outerDiv'>
        <ul>
          {todoList.map((todo, index) => (
            <TodoList 
              key={index} 
              index={index}
              todo={todo} 
              onDelete={() => removeTodo(index)} 
              onUpdate={updateTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TodoList({ todo, onDelete, onUpdate, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo);

  const handleSave = () => {
    if(editValue.trim() === "") {
      alert("Todo can't be empty");
      return;
    }
    onUpdate(index, editValue);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
            className="edit-input"
          />
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={() => { setIsEditing(false); setEditValue(todo); }} className="cancel-btn">Cancel</button>
        </>
      ) : (
        <>
          <span>{todo}</span>
          <div className="icons-wrapper">
            <FaEdit 
              className="icon edit-icon" 
              onClick={() => setIsEditing(true)} 
              title="Edit"
            />
            <FaTrash 
              className="icon delete-icon" 
              onClick={onDelete} 
              title="Delete"
            />
          </div>
        </>
      )}
    </li>
  );
}

export default App;
