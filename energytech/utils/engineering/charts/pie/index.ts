import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

export function StatusGeralFases(data: SheetEngBaseAnoFormPromiseInfo[]) {
  
  const concluido = data.filter((item) => item.fase == "CONCLUIDO").length;
  const emAtraso = data.filter((item) => item.fase == "EM ATRASO").length;
  const emDia = data.filter((item) => item.fase == "EM DIA").length;
  const faturado = data.filter((item) => item.fase == "FATURADO").length;
  return {
    concluido,
    emAtraso,
    emDia,
    faturado,
  };
}


