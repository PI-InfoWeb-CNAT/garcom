import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { restaurante } from "./restaurante";

export const mesa = pgTable("mesa", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  numero: varchar("numero", { length: 10 }).notNull(),
  ocupada: boolean("ocupada").notNull(),
  datahora_entrada: timestamp("datahora_entrada", { mode: "string" }),
  restaurante_id: uuid("restaurante_id")
    .references(() => restaurante.id, { onDelete: "cascade" })
    .notNull(),
});
