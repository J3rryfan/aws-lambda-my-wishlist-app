import { integer, pgTable, serial, text, index } from 'drizzle-orm/pg-core';

// create a blogs table
export const blogs = pgTable(
  'blogs',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    imageUrl: text('image_url').notNull(),
  },
  (table) => {
    return {
      nameIdx: index('userId_idx').on(table.userId),
    };
  }
);
