import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KindeProvider
      clientId='05e61564caea418a9b5ff28dbc58d8a3'
      domain='https://mywishlist.kinde.com'
      logoutUri={window.location.origin}
      redirectUri={window.location.origin}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </KindeProvider>
  </React.StrictMode>
);
