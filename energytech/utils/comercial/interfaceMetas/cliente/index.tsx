import { SheetInterfaceMetaClienteFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metasInterface/Cliente";

  export function agruparClientesPorMes(data: SheetInterfaceMetaClienteFormInfo[]) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Obter o mês atual (0 = Janeiro, 11 = Dezembro)
  const mesAtual = new Date().getMonth();

  // Filtrar e agrupar os dados por mês
  const clientesPorMes = data.reduce((acc, item) => {
    const mesItem = meses.indexOf(item.mes);

    // Incluir apenas meses atuais e futuros
    if (mesItem >= mesAtual) {
      if (!acc[item.mes]) {
        acc[item.mes] = [];
      }
      acc[item.mes].push(item);
    }

    return acc;
  }, {} as { [key: string]: SheetInterfaceMetaClienteFormInfo[] });

  // Ordenar os clientes de cada mês pela porcentagem de conclusão (do maior para o menor)
  for (const mes in clientesPorMes) {
    clientesPorMes[mes].sort((a, b) => {
      const porcentagemA = parseFloat(a.concluidoMesPorcentagem.replace("%", "")) || 0;
      const porcentagemB = parseFloat(b.concluidoMesPorcentagem.replace("%", "")) || 0;
      return porcentagemB - porcentagemA; // Ordena do maior para o menor
    });
  }

  return clientesPorMes;
}