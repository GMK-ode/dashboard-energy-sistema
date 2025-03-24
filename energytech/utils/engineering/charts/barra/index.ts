import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

export function graficoBarraPendencia(data: SheetEngBaseAnoFormPromiseInfo[]): { pendencias: string; total: number }[] {
  const contagemStatus: { [key: string]: number } = {};
  data.forEach(item => {
    const status = item.status;
    if (contagemStatus[status]) {
      contagemStatus[status]++;
    } else {
      contagemStatus[status] = 1;
    }
  });

  const dadosGrafico = Object.keys(contagemStatus).map(status => ({
    pendencias: status,
    total: contagemStatus[status]
  }));

  return dadosGrafico;
}