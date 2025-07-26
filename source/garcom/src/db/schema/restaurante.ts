import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const restaurante = pgTable("restaurante", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text("user_id").notNull(),
  cnpj: varchar("cnpj", { length: 18 }).notNull().unique(),
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: varchar("descricao", { length: 1024 }).notNull(),
  foto_perfil: varchar("foto_perfil", { length: 1024 }).notNull(),
  foto_banner: varchar("foto_banner", { length: 1024 }).notNull(),
  endereco_id: uuid("endereco_id").notNull(),
});
