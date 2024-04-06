import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from '@tanstack/react-router';

import { QueryClient } from '@tanstack/react-query';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className='flex items-center justify-between py-2 max-w-2xl mx-auto'>
        <Link to='/' className='text-2xl'>
          Home
        </Link>

        <div className='flex gap-x-4'>
          <Link
            href='/all-blogs'
            className='[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors'
          >
            All Blogs
          </Link>
        </div>
      </div>
    </>
  );
}

export default Route;
