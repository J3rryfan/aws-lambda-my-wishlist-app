import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <div className='flex-1'>
      <section className='w-full py-12 md:py-24 border-b'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10'>
          <div className='space-y-3'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
              Post Your Wishlist so that you can&apos;t forget
            </h1>
            <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              Our industry-based approach provides you with the knowledge and
              experience to excel in frontend development. Whether you're new to
              coding or an experienced developer, our courses are designed to
              help you level up.
            </p>
          </div>
        </div>
      </section>

      <div className='mt-8 flex items-center justify-center gap-x-4'>
        <Button onClick={() => login()}>Login</Button>
        <Button onClick={() => register()}>Register</Button>
      </div>
    </div>
  );
}

const Component = () => {
  const { isAuthenticated, isLoading } = useKindeAuth();
  if (isLoading) {
    return <div></div>;
  }
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Component,
});
