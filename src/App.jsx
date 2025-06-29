import React, { useState } from 'react';
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
            <TodoList key={index} todo={todo} onDelete={() => removeTodo(index)} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

function TodoList({ todo, onDelete }) {
  return (
    <li>
      {todo} <span onClick={onDelete}> Delete </span>
    </li>
  );
}
