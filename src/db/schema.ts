import {pgTable, text, timestamp, uuid, boolean} from 'drizzle-orm/pg-core';

export const opinionsTable = pgTable('opinions', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull(),
    isAnonymous: boolean().notNull().default(false),
    building: text().notNull(),
    status: text().notNull(),
    willingToChange: text().notNull(),
    message: text(),
    createdAt: timestamp().notNull().defaultNow()
})

export type Opinion = typeof opinionsTable.$inferSelect;
export type AddOpinionDto = typeof opinionsTable.$inferInsert;
