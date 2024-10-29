import React from 'react';
import axios from 'axios';
import './TodoItem.css';

const TodoItem = ({ todo, fetchTodos }) => {
    const handleMarkDone = async () => {
        try {
            await axios.put(` /api/todos/${todo._id}`, { isDone: !todo.isDone }); //Updating
            fetchTodos(); //Refershing the page after marking done
        }   catch (err) {
            console.error('Error updating todo', err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/todos/${todo._id}`); //Delete
            fetchTodos(); //Refresh the list afeter delete
        }   catch (err) {
            console.error('Error deleteing todo', err);
        }
    };

    return (
        <div className={`todo-item ${todo.isDone ? 'done' : ''}`}>
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
                <button onClick={handleMarkDone}>
                    {todo.isDone ? 'Undo' : 'Mark Done'}
                </button>
                <button onClick={handleDelete} className="delete-btn">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;

