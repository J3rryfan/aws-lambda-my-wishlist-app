import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

const app = new Hono();

app.get('/wishlist', (c) => {
  return c.json({ message: 'Hello from the frontend!' });
});

export const handler = handle(app);
