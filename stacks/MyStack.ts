import { StackContext, Api, StaticSite, Bucket } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /': 'packages/functions/src/lambda.handler',
      'GET /blogs': 'packages/functions/src/blogs.handler',
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
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
