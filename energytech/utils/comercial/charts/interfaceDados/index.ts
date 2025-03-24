import { SheetComMetsGeralFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metas";

export function barMetaAnoDadosInterface(data: SheetComMetsGeralFormInfo[]) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Converter valores para números e agrupar por mês
  const dadosAgrupados = data.reduce((acc, item) => {
    const mes = meses.indexOf(item.mes);
    if (mes === -1) return acc; // Ignora meses inválidos

    if (!acc[mes]) {
      acc[mes] = {
        mes: item.mes,
        previsto: 0,
        realizado: 0,
        count: 0,
      };
    }

    // Converte os valores para números e acumula
    acc[mes].previsto += parseFloat(item.previstoMes.replace("R$", "").replace(/\./g, "").replace(",", ".")) || 0;
    acc[mes].realizado += parseFloat(item.realizadoMes.replace("R$", "").replace(/\./g, "").replace(",", ".")) || 0;
    acc[mes].count += 1;

    return acc;
  }, {} as { [key: number]: { mes: string; previsto: number; realizado: number; count: number } });

  // Calcula o total previsto no ano
  const totalPrevistoAno = Object.values(dadosAgrupados).reduce((sum, item) => sum + item.previsto, 0);

  // Calcula as porcentagens e formata os dados para o gráfico
  const dadosFormatados = Object.keys(dadosAgrupados).map((mesStr) => {
    const mes = parseInt(mesStr, 10);
    const item = dadosAgrupados[mes];

    // Calcula as porcentagens
    const previstoPorcentagem = (item.previsto / totalPrevistoAno) * 1000;
    const realizadoPorcentagem = (item.realizado / totalPrevistoAno) * 1000;

    return {
      mes: item.mes, // Mantém o mês para o eixo X
      previsto: previstoPorcentagem,
      realizado: realizadoPorcentagem,
    };
  });

  // Calcula a média prevista em porcentagem
  const mediaPrevista = dadosFormatados.reduce((sum, item) => sum + item.previsto, 0) / dadosFormatados.length;

  // Retorna os dados formatados e a média prevista
  return {
    dados: dadosFormatados,
    mediaPrevista: mediaPrevista,
  };
}