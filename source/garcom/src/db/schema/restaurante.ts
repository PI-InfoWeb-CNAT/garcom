import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { endereco } from "./endereco";

export const restaurante = pgTable("restaurante", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cnpj: varchar("cnpj", { length: 18 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: varchar("descricao", { length: 1024 }).notNull(),
  foto_perfil: varchar("foto_perfil", { length: 1024 }).notNull(),
  foto_banner: varchar("foto_banner", { length: 1024 }).notNull(),
  endereco_id: uuid("endereco_id")
    .references(() => endereco.id)
    .notNull(),
});
