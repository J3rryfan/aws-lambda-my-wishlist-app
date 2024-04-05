import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
        Ai Blogger
      </h1>
      <div className='flex items-center justify-center h-dvh'>
        <Button onClick={onClick}>
          Message is "<i>{message}</i>"
        </Button>
      </div>
    </div>
  );
}

export default App;
