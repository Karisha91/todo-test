import React, { useEffect, useState } from "react"


const TodoApp = ({ authToken, onLogout }) => {
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

    return (
    <div>
      <h1>Todo App</h1>
      <button onClick={onLogout}>Logout</button>
      
      <h2>Your Todos:</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? '✅' : '⏳'}
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p>No todos found</p>}
    </div>
  )
}

export default TodoApp