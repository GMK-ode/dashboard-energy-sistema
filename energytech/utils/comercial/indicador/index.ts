import { SheetIndiceMetasFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/indicesMetas";
import { cleanAndParseNumber } from "@/utils/parseFloat";




export function IndicadorGuageMetas(data: SheetIndiceMetasFormInfo[]) {
  // Check if data is defined and has at least 3 elements
  if (!data || data.length < 3) {
    return {
      previsto: 0,
      concluido: 0,
      metaConluida: 0,
    };
  }

  const previsto = cleanAndParseNumber(data[2].totalPrevistoAno);
  const concluido = cleanAndParseNumber(data[2].totalRealizadoAno);
  const metaConluida = cleanAndParseNumber(data[2].metaConcluidaPorcentagem);

  return {
    previsto,
    concluido,
    metaConluida,
  };
}