import { SheetInterfaceMetaVendedorFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metasInterface/Vendedor";

  export function agruparVendedorPorMes(data: SheetInterfaceMetaVendedorFormInfo[]) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Obter o mês atual (0 = Janeiro, 11 = Dezembro)
  const mesAtual = new Date().getMonth();

  // Filtrar e agrupar os dados por mês
  const vendedorPorMes = data.reduce((acc, item) => {
    const mesItem = meses.indexOf(item.mes);

    // Incluir apenas meses atuais e futuros
    if (mesItem >= mesAtual) {
      if (!acc[item.mes]) {
        acc[item.mes] = [];
      }
      acc[item.mes].push(item);
    }

    return acc;
  }, {} as { [key: string]: SheetInterfaceMetaVendedorFormInfo[] });

  for (const mes in vendedorPorMes) {
    vendedorPorMes[mes].sort((a, b) => {
      const porcentagemA = parseFloat(a.concluidoMesPorcentagem.replace("%", "")) || 0;
      const porcentagemB = parseFloat(b.concluidoMesPorcentagem.replace("%", "")) || 0;
      return porcentagemB - porcentagemA; // Ordena do maior para o menor
    });
  }

  return vendedorPorMes;
}