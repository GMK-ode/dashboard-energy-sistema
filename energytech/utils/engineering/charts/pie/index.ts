import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

export function ProjetosConcluidos(data: SheetEngBaseAnoFormPromiseInfo[]) {
  return data.filter((item) => item.fase === "CONCLUIDO").length;
}

export function ProjetosEmAtraso(data: SheetEngBaseAnoFormPromiseInfo[]) {
  return data.filter((item) => item.fase === "EM ATRASO").length;
}

export function ProjetosEmDia(data: SheetEngBaseAnoFormPromiseInfo[]) {
  return data.filter((item) => item.fase === "EM DIA").length;
}

export function ProjetosFaturados(data: SheetEngBaseAnoFormPromiseInfo[]) {
  return data.filter((item) => item.fase === "FATURADO").length;
}

