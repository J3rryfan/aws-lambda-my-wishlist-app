// import { useState } from 'react';
// import { Button } from '@/components/ui/button';

import Header from './components/header';
import { Card, CardContent } from './components/ui/card';

function App() {
  return (
    <section className='py-24'>
      <Header />
      <div className='container'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold text-center'>AI Blogger</h1>
          <p className='mt-4 text-center text-muted-foreground'>
            Ai Blogger is a blogging platform that uses AI to generate content.
          </p>
        </div>

        <div className='mt-44'>
          <h2 className='text-xl font-semibold leading-none tracking-wide'>
            Recent blogs
          </h2>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <Card className='overflow-hidden'>
            <CardContent className='p-0'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default App;

// const [message, setMessage] = useState('Hi 👋');

// async function onClick() {
//   const response = await fetch(import.meta.env.VITE_APP_API_URL);
//   const json = await response.json();
//   setMessage(json.message);
// }
