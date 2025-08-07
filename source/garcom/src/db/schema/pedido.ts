import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { funcionario } from "./funcionario";
import { mesa } from "./mesa";
import { pgEnum } from "drizzle-orm/pg-core";

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
  datahora: timestamp("datahora", { mode: "string" }).notNull(),
  status: pedido_status_enum("status").notNull(),
  funcionario_id: uuid("funcionario_id")
    .references(() => funcionario.id, { onDelete: "cascade" })
    .notNull(),
  mesa_id: uuid("mesa_id")
    .references(() => mesa.id, { onDelete: "cascade" })
    .notNull(),
});
