import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  return (
    <div className=''>
      <h1 className='mb-4 text-2xl font-bold'>Profile</h1>
    </div>
  );
}
