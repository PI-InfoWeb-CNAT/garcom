import { pgTable, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { restaurante } from "./restaurante";

export const mesa = pgTable("mesa", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  restaurante_id: uuid("restaurante_id")
    .references(() => restaurante.id)
    .notNull(),
  numero: integer("numero").notNull(),
  ocupada: boolean("ocupada").default(false),
  datahora_entrada: timestamp("datahora_entrada"),
});
