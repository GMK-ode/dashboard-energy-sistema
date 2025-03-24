'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { columns, PedidoVendaGrid } from "./columns"
import { DataTable } from "./data-table"
import { useState, useEffect } from "react"; // Adicione o useEffect
import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

interface StatusPVProps {
  data: SheetEngBaseAnoFormPromiseInfo[]
}

export const StatusPV = ({ data }: StatusPVProps) => {
  const [dataGrid, setDataGrid] = useState<PedidoVendaGrid[]>([]);

  // Use useEffect para atualizar dataGrid apenas quando data mudar
  useEffect(() => {
    setDataGrid(
      data.map((row: SheetEngBaseAnoFormPromiseInfo) => ({
        id: row.id.toString(),
        status: row.status,
        fase: row.fase,
        cliente: row.cliente,
        dataEntrada: row.dataEntrada,
        pv: Number(row.pv),
      }))
    );
  }, [data]); // Dependência: data

  return (
    <Card className="flex-1 md:max-h-[400px] shadow-2xs  border-4 dark:border-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            Status Pedido Venda
          </CardTitle>
        </div>
        <CardDescription>
          Ultimos Status de Pedido de Venda
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-y-auto max-h-[320px] rounded-lg">
        <DataTable columns={columns} data={dataGrid} />
      </CardContent>
    </Card>
  );
};