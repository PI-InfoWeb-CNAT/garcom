import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { mesa } from "./mesa";

export const pedido_status_enum = pgEnum("pedido_status", [
  "aberto",
  "em_preparacao",
  "pronto",
  "finalizado",
]);

export const pedido = pgTable("pedido", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  status: pedido_status_enum("status").notNull().default("aberto"),
  horario: timestamp("horario").notNull(),
  mesa_id: uuid("mesa_id")
    .references(() => mesa.id)
    .notNull(),
});
