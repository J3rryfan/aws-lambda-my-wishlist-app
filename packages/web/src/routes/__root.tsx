import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from '@tanstack/react-router';

import { QueryClient } from '@tanstack/react-query';

import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import Logo from '@/components/logo';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});

function RootLayout() {
  const { isAuthenticated } = useKindeAuth();

  return (
    <>
      <header className='py-6'>
        <div className='container flex max-w-3xl items-center justify-between'>
          <Link to='/' className='text-2xl'>
            <Logo />
          </Link>

          <Link to='/create-blog'>Create</Link>

          {isAuthenticated && (
            <Link
              to='/profile'
              className='[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors'
            >
              Profile
            </Link>
          )}
        </div>
      </header>

      <hr />
      <div className='bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto'>
        <Outlet />
      </div>
    </>
  );
}
