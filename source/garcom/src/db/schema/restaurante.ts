import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./user";
import { endereco } from "./endereco";

export const restaurante = pgTable("restaurante", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  cnpj: varchar("cnpj", { length: 18 }).notNull().unique(),
  descricao: varchar("descricao", { length: 1024 }),
  foto_perfil: varchar("foto_perfil", { length: 1024 }),
  foto_banner: varchar("foto_banner", { length: 1024 }),
  endereco_id: uuid("endereco_id")
    .references(() => endereco.id, { onDelete: "cascade" })
});
