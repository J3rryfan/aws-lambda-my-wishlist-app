import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { blogs as blogsTable } from '@my-wishlist-app/core/db/schema/blogs';
import { db } from '@my-wishlist-app/core/db';

const app = new Hono();

// get all blogs
app.get('/blogs', async (c) => {
  const blogs = await db.select().from(blogsTable);
  return c.json({ blogs });
});

// post a new blog
app.post('/blogs', async (c) => {
  const body = await c.req.json();
  const blogs = body.blogs;
  const newBlogs = await db.insert(blogsTable).values(blogs).returning();
  return c.json({ newBlogs });
});

export const handler = handle(app);
