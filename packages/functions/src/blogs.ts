import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { blogs as blogsTable } from '@my-wishlist-app/core/db/schema/blogs';
import { db } from '@my-wishlist-app/core/db';
import { eq } from 'drizzle-orm';

import { authMiddleware } from '@my-wishlist-app/core/auth';

const app = new Hono();

// get all blogs
app.get('/blogs', authMiddleware, async (c) => {
  const userId = c.var.userId;

  const blogs = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.userId, userId));

  return c.json({ blogs });
});

// post a new blog
app.post('/blogs', authMiddleware, async (c) => {
  const userId = c.var.userId;

  const body = await c.req.json();
  const blog = {
    ...body.blog,
    userId: userId,
  };
  const newBlog = await db.insert(blogsTable).values(blog).returning();
  return c.json({ newBlog });
});

// get a single blog
app.get('/blogs/:id', authMiddleware, async (c) => {
  const id = +c.req.param('id');
  const userId = c.var.userId;

  const singleBlog = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, id));
});

export const handler = handle(app);
