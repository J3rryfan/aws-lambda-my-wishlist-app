import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
// import Logo from '@/components/logo';

export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <div className='flex flex-col h-dvh items-center justify-center'>
      <h1 className='text-5xl font-bold'>Welcome to WishList </h1>
      <p className='text-xl mt-5 text-muted-foreground'>
        A app where you can post your wishlist
      </p>
      <div className='mt-8 flex items-center justify-center gap-x-4'>
        <Button onClick={() => login()}>Login</Button>
        <Button onClick={() => register()}>Register</Button>
      </div>
    </div>
  );
}

const Component = () => {
  const { isAuthenticated } = useKindeAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Component,
});
