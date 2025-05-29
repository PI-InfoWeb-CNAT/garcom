import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";
import { pedido } from "./pedido";
import { item } from "./item";

export const itemPedido = pgTable("item_pedido", {
  pedido_id: uuid("pedido_id")
    .references(() => pedido.id)
    .notNull(),
  item_id: uuid("item_id")
    .references(() => item.id)
    .notNull(),
  observacao: text("observacao"),
  quantidade: integer("quantidade").notNull(),
});
