import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const token = localStorage.getItem('token');
            const config = { header: { Athorization: token } };
            const response = await axios.get('/api/todos', config);
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const handleAddTodo = async () =>{
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: token } };
        await axios.post('/api/todos', { title: newTodo }, config);
        setNewTodo('');
    };

    return (
        <div>
            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

