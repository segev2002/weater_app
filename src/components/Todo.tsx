import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { addTodo, toggleTodo, removeTodo } from '../store/TodoSlice';

const Todo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todo.todos);
    const [newTodo, setNewTodo] = React.useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        } 
    };
    const handleToggleTodo = (id: number) => {
        dispatch(toggleTodo(id));
    };


    return (
        <div>
            <h3>Todo List</h3>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => handleToggleTodo(todo.id)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        {todo.text}
                        <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Todo;