import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";

export const UsersTable = pgTable('users',{
    id: varchar().primaryKey(),
    email: varchar().notNull().unique(),
    imageUrl:varchar().notNull(),
    name : varchar().notNull(),
    createdAt,
    updatedAt,
})