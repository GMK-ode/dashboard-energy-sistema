"use client"

import { ColumnDef } from "@tanstack/react-table"
export type PedidoVendaGrid = {
  id: string
  pv: number
  status: string
  fase: string,
  cliente: string,
}

export const columns: ColumnDef<PedidoVendaGrid>[] = [
  {
    header: "Pedido de Venda",
    accessorKey: "pv",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Fase",
    accessorKey: "fase",
  },
  {
    header: "Cliente",
    accessorKey: "cliente",
  },
]
