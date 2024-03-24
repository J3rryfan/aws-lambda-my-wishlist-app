import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

export const handler = handle(app);
