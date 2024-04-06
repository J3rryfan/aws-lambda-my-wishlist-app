import { useQuery } from '@tanstack/react-query';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <h1 className='text-3xl font-bold'>Home Page</h1>
    </>
  );
}
