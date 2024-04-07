import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from '@tanstack/react-router';

import { QueryClient } from '@tanstack/react-query';
import Logo from '@/components/logo';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <header className='py-6'>
        <div className='container flex max-w-3xl items-center justify-between'>
          <Link to='/' className='text-2xl'>
            <Logo />
          </Link>

          <Link
            to='/all-blogs'
            className='[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors'
          >
            All Blogs
          </Link>
          <Link
            to='/about'
            className='[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors'
          >
            About
          </Link>
          <Link to='/create-blog'>Create</Link>
        </div>
      </header>

      <hr />
      <div className='bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto'>
        <Outlet />
      </div>
    </>
  );
}
