import React, { useState } from 'react';

interface item {
  id: number;
  text: string;
  completed: boolean;
  isDeleted: boolean; // New property to track if the item is deleted
}

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([
    { id: 1, text: "This is a long todo message", completed: false, isDeleted: false },
    { id: 2, text: "Short todo", completed: false, isDeleted: false },
  ]);
  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClick = () => {
    const newTodo: item = { id: Date.now(), text: input, completed: false, isDeleted: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  return (
    <div className='main-container column center'>
      <div className="main center column">
        <h1 className='TODO'>TODO</h1>
        <div className="center column">
          <input
            type="text"
            placeholder='Add to do item'
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button onClick={handleClick}>Add</button>
        </div>
      </div>
      <div className="tasks center">
        <ul>
          {todos.map((todo) => (
            // Check if the task is not deleted before rendering it
            !todo.isDeleted && (
              <li
                key={todo.id}
                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              >
                <span onClick={() => handleToggle(todo.id)}>
                  {todo.text}
                </span>
                <button className='deleteButton' onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};


