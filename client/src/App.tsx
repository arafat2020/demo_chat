import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [msg, setMsg] = useState()
  async function greet() {
    const res = await fetch(`/api/greetings/arafat`)
    
    const data = await res.json()    
    setMsg(data)

  }
  console.log(msg);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="React logo" />
        <img src={viteLogo} className="App-logo" alt="Vite logo" />
        <h1>Welcome to React with Vite!</h1>
        <button onClick={() => greet()}>Greet World ola</button>
      </header>
    </div>
  )
}

export default App
