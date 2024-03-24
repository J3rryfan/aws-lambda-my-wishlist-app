import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Hi 👋');

  async function onClick() {
    const response = await fetch(import.meta.env.VITE_APP_API_URL);
    const json = await response.json();
    setMessage(json.message);
  }

  return (
    <div className='App'>
      <div className='card'>
        <button onClick={onClick}>
          Message is "<i>{message}</i>"
        </button>
      </div>
    </div>
  );
}

export default App;
