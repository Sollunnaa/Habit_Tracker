import {serial,  varchar, pgTable, time, timestamp, boolean,text } from "drizzle-orm/pg-core";


export const habit = pgTable("habit", {
  id: serial("id").primaryKey(),
  habitName: varchar("habit_name", {length: 50}).notNull(),
  frequency: varchar("frequency", {length: 20}).notNull(),
  time: text("time_scheduled").notNull(),
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  isDone: boolean("is_done").default(false).notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull()
});