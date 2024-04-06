import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// create a users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
});

// create a blogs table
export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

type Blog = typeof blogs.$inferSelect;
type User = typeof users.$inferSelect;
