import { StackContext, Api, StaticSite, Bucket } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const audience = `api-WishlistApp-${stack.stage}`;
  console.log(audience);

  const api = new Api(stack, 'api', {
    authorizers: {
      myAuthorizer: {
        type: 'jwt',
        jwt: {
          issuer: 'https://mywishlist.kinde.com',
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: 'myAuthorizer',
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      'GET /': {
        authorizer: 'none',
        function: { handler: 'packages/functions/src/lambda.handler' },
      },
      'GET /blogs': 'packages/functions/src/blogs.handler',
      'POST /blogs': 'packages/functions/src/blogs.handler',
      'GET /csharp': {
        function: {
          handler: 'packages/CSharp/WishlistApp',
          runtime: 'container',
        },
      },
    },
  });

  const web = new StaticSite(stack, 'web', {
    path: 'packages/web',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
