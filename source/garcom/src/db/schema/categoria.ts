import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { restaurante } from "./restaurante";

export const categoria = pgTable("categoria", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  nome: varchar("nome", { length: 255 }).notNull(),
  restaurante_id: uuid("restaurante_id")
    .references(() => restaurante.id, { onDelete: "cascade" })
    .notNull(),
});
