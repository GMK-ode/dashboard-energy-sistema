"use client";
import { InterfaceMetaVendedor } from "@/components/dataframegrid/comercial/vendedor"
import { InterfaceMetaCliente } from "@/components/dataframegrid/comercial/cliente";
import { BarMetaAno } from "@/components/chart/comercial/bar";
import { KpiCardComercial } from "@/components/kpicard/comercial/index";
import useCoinData from "@/hooks/coinData";
import * as React from "react"
import { useEffect, useState } from "react";
import {  getSheetsData,  } from "@/services/microsoft/excel/sheetData";
import { dashboardCormecial  } from "@/interfaces/microsoft/appsettings";
import { SheetIndiceMetasFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/indicesMetas";
import { SheetComMetsGeralFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metas";
import { SheetInterfaceMetaClienteFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metasInterface/Cliente";
import { SheetInterfaceMetaVendedorFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metasInterface/Vendedor";
import { Pie180IndicadorMetaConluida } from "@/components/chart/comercial/pie/indicador";
import useTokenData from "@/hooks/tokenData";





export default function DashBoardComercial() {
  const { coin, loading } = useCoinData();
  const [dataCliente, setDataCliente] = useState<SheetComMetsGeralFormInfo[]>([]);
  const [dataVendedor, setDataVendedor] = useState<SheetComMetsGeralFormInfo[]>([]);
  const [dataIndiceTotal, setDataIndiceTotal] = useState < SheetIndiceMetasFormInfo[]> ([]);
  const [dataInterfaceCliente, setDataInterfaceCliente] = useState < SheetInterfaceMetaClienteFormInfo[]> ([]);
  const [dataInterfaceVendedor, setDataInterfaceVendedor] = useState < SheetInterfaceMetaVendedorFormInfo[]> ([]);
  const { tokenData } = useTokenData();  

    

  const handleData = async () => {
    if(tokenData === '') return <h1>Token não encontrado</h1>;
    const responseCliente = await getSheetsData(dashboardCormecial, 'Metas Clientes Geral', tokenData);
    const mappedDataCliente = responseCliente.text.slice(1).map((row: string[], rowIndex): SheetComMetsGeralFormInfo => ({
      id: rowIndex + 1,
      tipo: row[0],
      previstoMes: row[1],
      realizadoMes: row[2],
      concluidoMesPorcentagem: row[3],
      mes: row[4],
      nMes: row[5],
      
    }));
    setDataCliente(mappedDataCliente);
    
    const responseVendedor = await getSheetsData(dashboardCormecial, 'Metas Vendedores Geral', tokenData);
    const mappedDataVendedor = responseVendedor.text.slice(1).map((row: string[], rowIndex): SheetComMetsGeralFormInfo => ({
      id: rowIndex + 1,
      tipo: row[0],
      previstoMes: row[1],
      realizadoMes: row[2],
      concluidoMesPorcentagem: row[3],
      mes: row[4],
      nMes: row[5],
      
    }));
    setDataVendedor(mappedDataVendedor);
    
    const responseIndicesTotal = await getSheetsData(dashboardCormecial, 'Indices Metas', tokenData);
    const mappedDataIndice= responseIndicesTotal.text.slice(1).map((row: string[], rowIndex): SheetIndiceMetasFormInfo => ({
      id: rowIndex + 1,
      tipo: row[0],
      totalPrevistoAno: row[1],
      totalRealizadoAno: row[2],
      metaConcluidaPorcentagem: row[3],
    }));
    setDataIndiceTotal(mappedDataIndice)
    
    const responseInterfaceCliente = await getSheetsData(dashboardCormecial, 'Metas Clientes Geral', tokenData);
    const mappedDataInterfaceCliente = responseInterfaceCliente.text.slice(1).map((row: string[], rowIndex): SheetInterfaceMetaClienteFormInfo => ({
      id: rowIndex + 1,
      clientes: row[0],
      concluidoMesPorcentagem: row[3],
      mes: row[4],
      nMes: row[5],
    }));
    setDataInterfaceCliente(mappedDataInterfaceCliente)
    
    const responseInterfaceVendedor = await getSheetsData(dashboardCormecial, 'Metas Vendedores Geral', tokenData);
    const mappedDataInterfaceVendedor = responseInterfaceVendedor.text.slice(1).map((row: string[], rowIndex): SheetInterfaceMetaVendedorFormInfo => ({
      id: rowIndex + 1,
      vendedor: row[0],
      concluidoMesPorcentagem: row[3],
      mes: row[4],
      nMes: row[5],
    }));
    setDataInterfaceVendedor(mappedDataInterfaceVendedor)
    
  }
  


  useEffect(() => {
    handleData();

  }, [tokenData]);


  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-1  md:grid-cols-5 lg:grid-cols-5 gap-2 scroll-smooth overflow-hidden-y  ">

        {/* //Kpis dolar */}
        {coin.map((dolar, index) => (
          dolar.USDBRL &&
          <KpiCardComercial
            key={index}
            code={dolar.USDBRL.code}
            name={dolar.USDBRL.name}
            bid={dolar.USDBRL.bid}
            varBid={dolar.USDBRL.varBid}
            coin='USD-BRL' />
        ))}
        {/* //Kpis Euro */}
        {coin.map((euro, index) => (
          euro.EURBRL &&
          <KpiCardComercial key={index}
            code={euro.EURBRL.code}
            name={euro.EURBRL.name}
            bid={euro.EURBRL.bid}
            varBid={euro.EURBRL.varBid}
            coin='EUR-BRL' />
        ))}

        <Pie180IndicadorMetaConluida data={dataIndiceTotal}/>
        {/* <IndicadorGaugeVelocidade /> */}
        {/* //Kpis ouro */}
        {coin.map((ouro, index) => (
          ouro.XAUUSD &&
          <KpiCardComercial key={index}
            code={ouro.XAUUSD.code}
            name={ouro.XAUUSD.name}
            bid={ouro.XAUUSD.bid}
            varBid={ouro.XAUUSD.varBid}
            coin='XAU-USD' />
        ))}
        {/* //Kpis Patra */}
        {coin.map((prata, index) => (
          prata.XAGUSD &&
          <KpiCardComercial key={index}
            code={prata.XAGUSD.code}
            name={prata.XAGUSD.name}
            bid={prata.XAGUSD.bid}
            varBid={prata.XAGUSD.varBid}
            coin='XAG-USD' />
        ))}

      </section>
      {/* parte cima grafico */}
      <section className="mt-2 grid grid-cols-1  md:grid-cols-2  gap-2">
        <BarMetaAno title="Meta geral Vendedores" data={dataVendedor}/>
        <InterfaceMetaVendedor data={dataInterfaceVendedor} />
      </section>
      {/* parte baixo grafico */}
      <section className="mt-2 grid grid-cols-1  md:grid-cols-2  gap-2">
        <BarMetaAno title="Meta geral Clientes" data={dataCliente}/>
        <InterfaceMetaCliente data={dataInterfaceCliente} />
      </section>
    </main>
  );
}
