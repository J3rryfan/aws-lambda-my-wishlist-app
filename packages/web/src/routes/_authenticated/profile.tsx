import { Button } from '@/components/ui/button';

import { createFileRoute } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { logout, user } = useKindeAuth();

  if (!user || !user.picture) {
    throw new Error('User not found');
  }

  return (
    <div className='flex flex-col gap-y-4 items-center'>
      <Card className='w-full max-w-lg mx-auto'>
        <CardHeader className='flex flex-col items-center p-6'>
          <Avatar className='m-0'>
            <AvatarImage src={user.picture} alt='profile logo' />
            <AvatarFallback>{user.given_name}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1 text-center'>
            <h2 className='text-lg font-bold'>{user.given_name}</h2>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              @{user.given_name}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p>Rockstar. Loves snakes. Welcome to my nightmare</p>
        </CardContent>
        <div className='flex items-center justify-end gap-x-4'>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </Card>
    </div>
  );
}
