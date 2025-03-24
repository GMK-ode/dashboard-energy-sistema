import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

export function prazoEntrega(data: SheetEngBaseAnoFormPromiseInfo[]) {
  const dataEntrega = data.map((pv) => pv.entregaCliente);
  const pvComPrazo = data.map((pv) => pv.pv);
  return { dataEntrega, pvComPrazo };
}