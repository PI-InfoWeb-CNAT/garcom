import { pgTable, uuid, varchar, text, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { categoria } from "./categoria";

export const item = pgTable("item", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: text("descricao"),
  preco_unitario: numeric("preco_unitario", {
    precision: 10,
    scale: 2,
  }).notNull(),
  categoria_id: uuid("categoria_id")
    .references(() => categoria.id)
    .notNull(),
});
