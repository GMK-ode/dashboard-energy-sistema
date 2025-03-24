import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";



export function CarrouselDataAtrasados(data: SheetEngBaseAnoFormPromiseInfo[]) {
  return data.filter((item) => item.fase.includes("EM ATRASO"));
}