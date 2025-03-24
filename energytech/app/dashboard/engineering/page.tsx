'use client';
import * as React from "react"
import { useEffect, useState } from "react";
import { BarHorizontalPendencias } from "@/components/chart/engineering/bars";
import { LineChartEntradaProjetoMes } from "@/components/chart/engineering/line";
import { PieChartStatusGeral } from "@/components/chart/engineering/pie";
import { EntregasAvisos } from "@/components/dataframegrid/engineering/dataentregas";
import { StatusPV } from "@/components/dataframegrid/engineering/status";
import { dashboardEngenharia } from "@/interfaces/microsoft/appsettings";
import { getSheetsData } from "@/services/microsoft/excel/sheetData";
import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";
import { kpiAprovEng, kpiCompras, kpiEntregas, kpiMontagem, kpiProjetos } from "@/utils/engineering/kpis";
import { KpiCardEng } from "@/components/kpicard/engineering";
import { ProjetosConcluidos, ProjetosEmAtraso, ProjetosEmDia, ProjetosFaturados} from "@/utils/engineering/charts/pie"; 
import { PedidoEmAtraso } from "@/components/pedidoEmAtraso";
import { useAuthentication } from "@/context/userAuthentication";



export default function DashBoardEngenharia() {
  const [data, setData] = useState<SheetEngBaseAnoFormPromiseInfo[]>([]);
  const [kpi, setKpi] = useState({ projetos: 0, apovEng: 0, montagem: 0, compras: 0, entregas: 0 });
  const [fases, setFases] = useState({ projConcluidos: 0, projEmAtraso: 0, projEmDia: 0, projFaturados: 0 });
  const { token } = useAuthentication();

  const handleData = async () => {
    const response = await getSheetsData(dashboardEngenharia, 'Base Ano', token);
    // Mapeando os dados para a estrutura correta
    const mappedData = response.text.slice(1).map((row: string[], rowIndex): SheetEngBaseAnoFormPromiseInfo => ({
      id: rowIndex + 1,
      status: row[0],
      fase: row[1],
      cliente: row[2], 
      pv: row[3],
      pedidoCliente: row[4],
      entregaCliente: row[5],
      dataEntrada:row[6],
      dataAprovacaoEng: row[7],
      compras: row[8],
      plaquetas: row[9],
      planoDeCusto: row[10],
      desenho: row[11],
      inicioMontagem: row[12],
      finalizacao: row[13],
      teste: row[14],
      documentacao: row[15],
      liberacao: row[16],
      embalagem: row[17],
      entrega: row[18],
    }));

    setData(mappedData);

  }

  const handleFases = () => {
  const projConcluidos = ProjetosConcluidos(data);
  const projEmAtraso = ProjetosEmAtraso(data);
  const projEmDia = ProjetosEmDia(data);
  const projFaturados = ProjetosFaturados(data);

  setFases({ projConcluidos, projEmAtraso, projEmDia, projFaturados});

  return { projConcluidos, projEmAtraso, projEmDia, projFaturados };
};
  
  const handleKPI = () => {
    const projetos = kpiProjetos(data);
    const apovEng = kpiAprovEng(data);
    const montagem = kpiMontagem(data);
    const compras = kpiCompras(data);
    const entregas = kpiEntregas(data);
    setKpi({ projetos, apovEng, montagem, compras, entregas });

    return { projetos, apovEng, montagem, compras, entregas };
  }


  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    handleKPI();
    handleFases();
  }, [data]);

  

  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 scroll-smooth overflow-hidden-y">

        <KpiCardEng
          title="Projetos"
          description="Total de projetos"
          value={kpi.projetos}
        />

        <KpiCardEng
          title="Aprov. Eng"
          description="Projetos aprovados"
          value={kpi.apovEng}
        />

        <KpiCardEng
          title="Compras"
          description="Compras necessárias"
          value={kpi.compras}
        />

        <KpiCardEng
          title="Montagem"
          description="Proj. em montagem"
          value={kpi.montagem}
        />

        <KpiCardEng
          title="Entregas"
          description="Entregas realizadas"
          value={kpi.entregas}
        />
        
      </section>
      <section className="mt-2 grid grid-cols-1  md:grid-cols-1  gap-2">
        <PedidoEmAtraso data={data} />
      </section>
      <section className="mt-2 grid grid-cols-1  md:grid-cols-3  gap-2">
        <PieChartStatusGeral fases={fases} />
        <EntregasAvisos data={data}/>
        <BarHorizontalPendencias data={data}/>
      </section>
      <section className="mt-2 grid grid-cols-1  md:grid-cols-2  gap-2">
        <LineChartEntradaProjetoMes data={data}/>
        <StatusPV data={data} />
      </section>
    </main>
  );
}
