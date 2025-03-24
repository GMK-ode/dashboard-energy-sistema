import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

export function entradaProjetoMes(data: SheetEngBaseAnoFormPromiseInfo[]): { month: string; entrada: number }[] {
  // Verifica se data é undefined ou não é um array
  if (!data || !Array.isArray(data)) {
    console.error("Dados inválidos ou não fornecidos.");
    return [];
  }

  // Objeto para armazenar a contagem de projetos por mês e ano
  const contagemPorMesAno: { [key: string]: number } = {};

  // Mapeamento dos nomes dos meses
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Itera sobre os dados
  data.forEach(item => {
    // Verifica se dataEntrada existe e está no formato correto
    if (item.dataEntrada && typeof item.dataEntrada === "string") {
      // Extrai o dia, mês e ano da data (formato esperado: "DD/MM/YYYY")
      const partesData = item.dataEntrada.split("/");

      // Verifica se a data tem 3 partes (dia, mês, ano)
      if (partesData.length === 3) {
        const [dia, mes, ano] = partesData.map(Number);

        // Verifica se o mês é válido (1 a 12)
        if (mes >= 1 && mes <= 12) {
          const nomeMes = meses[mes - 1]; // Converte o número do mês para o nome do mês
          const chave = `${nomeMes} ${ano}`; // Combina o nome do mês com o ano

          // Incrementa a contagem para o mês e ano correspondentes
          if (contagemPorMesAno[chave]) {
            contagemPorMesAno[chave]++;
          } else {
            contagemPorMesAno[chave] = 1;
          }
        } else {
          
        }
      } else {
        
      }
    } else {
      
    }
  });

  // Formata os dados para o gráfico
  const dadosGrafico = Object.keys(contagemPorMesAno).map(chave => ({
    month: chave, // Exemplo: "Fevereiro 2025"
    entrada: contagemPorMesAno[chave],
  }));

  // Ordena os dados por ano e mês
  dadosGrafico.sort((a, b) => {
    const [mesA, anoA] = a.month.split(" ");
    const [mesB, anoB] = b.month.split(" ");
    const indiceMesA = meses.indexOf(mesA);
    const indiceMesB = meses.indexOf(mesB);

    if (anoA === anoB) {
      return indiceMesA - indiceMesB; // Ordena por mês no mesmo ano
    }
    return parseInt(anoA) - parseInt(anoB); // Ordena por ano
  });

  return dadosGrafico;
}