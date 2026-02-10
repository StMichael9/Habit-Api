import {
  pgTable,
  uuid,
  varchar, // same thing as length only difference is you can set a max length
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(), // notNull() Basically means its not optional
  username: varchar("username", { length: 250 }).notNull().unique(), // unique() means no two users can have the same username, email etc whatever you put it on,
  password: varchar("password", { length: 250 }).notNull(),

  firstname: varchar("first_name", { length: 250 }), // Can be display names
  lastname: varchar("last_name", { length: 250 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const habits = pgTable("habits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  frequency: varchar("frequency", { length: 20 }).notNull(),
  targetCount: integer("target_count").default(1),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const entries = pgTable("entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .references(() => habits.id, { onDelete: "cascade" })
    .notNull(),
  completeDate: timestamp("complete_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  color: varchar("color", { length: 7 }).default("#FFFFFF").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const habitTags = pgTable("habit_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .references(() => habits.id, { onDelete: "cascade" })
    .notNull(),

  tagId: uuid("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  habits: many(habits),
}));

export const habitRelations = relations(habits, ({ one, many }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
  entries: many(entries),
  habitTags: many(habitTags),
}));

export const entriesRelations = relations(entries, ({ one }) => ({
  habits: one(habits, {
    fields: [entries.habitId],
    references: [habits.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  tags: many(habitTags),
}));

export const habitTagsRelations = relations(habitTags, ({ one }) => ({
  habit: one(habits, {
    fields: [habitTags.habitId],
    references: [habits.id],
  }),

  tag: one(tags, {
    fields: [habitTags.tagId],
    references: [tags.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
