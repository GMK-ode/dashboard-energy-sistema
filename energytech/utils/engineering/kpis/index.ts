import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";


export function kpiEngenharia(data: SheetEngBaseAnoFormPromiseInfo[] ) {
    const totalProjetos = data.length;
    const totalAprovados = data.filter((item) => item.dataAprovacaoEng != '').length;
    const totalMontagem = data.filter((item) => item.inicioMontagem != '').length;
    const totalComprasDados = data.filter((item) => item.compras != '').length;
    const totalCompras = totalComprasDados - totalMontagem;
    const totalEntregas = data.filter((item) => item.entrega != '').length;
    return {
        totalProjetos,
        totalAprovados,
        totalMontagem,
        totalCompras,
        totalEntregas,
    }
}

