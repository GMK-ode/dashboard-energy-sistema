import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";


export function kpiProjetos(data: SheetEngBaseAnoFormPromiseInfo[] ) {
    const totalProjetos = data.length;
    return totalProjetos;
}

export function kpiAprovEng(data: SheetEngBaseAnoFormPromiseInfo[] ) {
  const totalAprovados = data.filter((item) => item.dataAprovacaoEng != '').length;
  return totalAprovados;
}

export function kpiMontagem(data: SheetEngBaseAnoFormPromiseInfo[]) {
  const totalMontagem = data.filter((item) => item.inicioMontagem != '').length;
  return totalMontagem;
}

export function kpiCompras(data: SheetEngBaseAnoFormPromiseInfo[]) {
  const totalComprasDados = data.filter((item) => item.compras != '').length;
  const totalMontagem = kpiMontagem(data);
  const totalCompras = totalComprasDados - totalMontagem;
  return totalCompras;
}
export function kpiEntregas(data: SheetEngBaseAnoFormPromiseInfo[]) {
  const totalEntregas = data.filter((item) => item.entrega != '').length;
  return totalEntregas;
}