import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import TodoApp from './components/TodoApp'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      
      
      setAuthToken(token)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    console.log(token);
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    setAuthToken('')
    setIsLoggedIn(false)
  }


  return (
    <>
      <div>
        <h1>Todo App</h1>
        {isLoggedIn ? (
          <TodoApp authToken={authToken} onLogout={handleLogout} /> 
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>

    </>
  )
}

export default App
