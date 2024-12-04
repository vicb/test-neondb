import { pgTable, text } from 'drizzle-orm/pg-core';

export const test = pgTable('test', {
	name: text('name').notNull(),
});
