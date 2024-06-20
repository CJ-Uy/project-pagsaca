import {
  doublePrecision,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const voltageData = pgTable("voltage_table", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  voltage: doublePrecision("voltage").notNull(),
});

export type InsertUser = typeof voltageData.$inferInsert;
export type SelectUser = typeof voltageData.$inferSelect;
