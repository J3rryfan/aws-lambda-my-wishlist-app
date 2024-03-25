import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Hi 👋');

  async function onClick() {
    const response = await fetch(import.meta.env.VITE_APP_API_URL);
    const json = await response.json();
    setMessage(json.message);
  }

  return (
    <div className='App'>
      <h1 className='text-3xl font-bold flex items-center justify-center'>
        Hello world
      </h1>
      <div className='card'>
        <button onClick={onClick}>
          Message is "<i>{message}</i>"
        </button>
      </div>
    </div>
  );
}

export default App;
