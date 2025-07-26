import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const funcionario = pgTable("funcionario", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text("user_id").notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 14 }).notNull().unique(),
  restaurante_id: uuid("restaurante_id").notNull(),
});
