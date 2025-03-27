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
import { kpiEngenharia } from "@/utils/engineering/kpis";
import { KpiCardEng } from "@/components/kpicard/engineering";
import { PedidoEmAtraso } from "@/components/pedidoEmAtraso";
import useTokenData from "@/hooks/tokenData";



export default function DashBoardEngenharia() {
  const [data, setData] = useState<SheetEngBaseAnoFormPromiseInfo[]>([]);
  const { tokenData } = useTokenData();  
  
  const handleData = async () => {
    if(tokenData === '') return <h1>Token não encontrado</h1>;
    const response = await getSheetsData(dashboardEngenharia, 'Base Ano', tokenData);
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

  
  const kpi = kpiEngenharia(data);


  useEffect(() => {
    handleData();
  }, [tokenData]);

  

  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-2 scroll-smooth overflow-hidden-y">

        <KpiCardEng
          title="Projetos"
          description="Total de projetos"
          value={kpi.totalProjetos}
        />

        <KpiCardEng
          title="Aprov. Eng"
          description="Projetos aprovados"
          value={kpi.totalAprovados}
        />

        <KpiCardEng
          title="Compras"
          description="Compras necessárias"
          value={kpi.totalCompras}
        />

        <KpiCardEng
          title="Montagem"
          description="Proj. em montagem"
          value={kpi.totalMontagem}
        />

        <KpiCardEng
          title="Entregas"
          description="Entregas realizadas"
          value={kpi.totalEntregas}
        />
        
      </section>
      <section className="mt-2 grid grid-cols-1  md:grid-cols-1  gap-2">
        <PedidoEmAtraso data={data} />
      </section>
      <section className="mt-2 grid grid-cols-1  md:grid-cols-3  gap-2">
        <PieChartStatusGeral data={data} />
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
