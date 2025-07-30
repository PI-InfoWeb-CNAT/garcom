import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./user";

export const funcionario = pgTable("funcionario", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  cpf: varchar("cpf", { length: 14 }).notNull().unique(),
  restaurante_id: uuid("restaurante_id").notNull(),
});
