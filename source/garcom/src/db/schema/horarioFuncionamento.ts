import { pgTable, uuid, integer, time, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { restaurante } from "./restaurante";

export const horarioFuncionamento = pgTable("horario_funcionamento", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  dia_semana: integer("dia_semana").notNull(),
  horario_inicio: time("horario_inicio"),
  horario_fim: time("horario_fim"),
  aberto: boolean("aberto").notNull(),
  restaurante_id: uuid("restaurante_id")
    .references(() => restaurante.id, { onDelete: "cascade" })
    .notNull(),
});
