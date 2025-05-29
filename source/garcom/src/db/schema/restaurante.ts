import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const restaurante = pgTable("restaurante", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  nome: varchar("nome", { length: 255 }).notNull(),
  senha: varchar("senha", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 20 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  descricao: text("descricao"),
});
