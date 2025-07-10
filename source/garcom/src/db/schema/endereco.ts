import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const endereco = pgTable("endereco", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cep: varchar("cep", { length: 10 }).notNull(),
  logradouro: varchar("logradouro", { length: 255 }).notNull(),
  numero: varchar("numero", { length: 10 }),
  complemento: varchar("complemento", { length: 255 }),
  cidade: varchar("cidade", { length: 255 }).notNull(),
  estado: varchar("estado", { length: 255 }).notNull(),
  bairro: varchar("bairro", { length: 255 }).notNull(),
});
