import React, { useEffect, useState } from "react"


const TodoApp = ({ authToken, onLogout }) => {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:8080/todos', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setTodos(data)

            }
        } catch (error) {
            console.error('Error fetching todos:', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTodos()
    }, [])
    if (loading) {
        return <div>Loading todos...</div>
    }

    const addTodo = async (text) => {
        console.log('Auth token:', authToken);
        try {
            const response = await fetch('http://localhost:8080/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ 
                title: text, 
                completed: false
            })
            })
            if (response.ok) {
                fetchTodos()
            }
        } catch (error) {
            console.error('Failed to add todo:', response.status, response.statusText);
    
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await fetch (`http://localhost:8080/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            if (response.ok) {
                fetchTodos()
            }
        } catch (error) {
            console.error('Error deleting todo:', error)
        }
    }

    return (
        <div>
            <h1>Todo App</h1>
            <button onClick={onLogout}>Logout</button>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (newTodo.trim()) {
                    addTodo(newTodo)
                    setNewTodo('') 
                }
            }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                />
                <button type="submit">Add Todo</button>
            </form>

            <h2>Your Todos:</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.completed ? '✅' : '⏳'}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {todos.length === 0 && <p>No todos found</p>}
        </div>
    )
}

export default TodoApp