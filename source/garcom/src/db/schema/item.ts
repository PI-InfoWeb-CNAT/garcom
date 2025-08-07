import { pgTable, uuid, varchar, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { categoria } from "./categoria";

export const item = pgTable("item", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  nome: varchar("nome", { length: 255 }).notNull(),
  preco_unitario: numeric("preco_unitario").notNull(),
  descricao: varchar("descricao", { length: 1024 }),
  foto: varchar("foto", { length: 1024 }).notNull(),
  categoria_id: uuid("categoria_id")
    .references(() => categoria.id, { onDelete: "cascade" })
    .notNull(),
});
