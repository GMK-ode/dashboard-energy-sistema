"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"
import { SheetInterfaceMetaVendedorFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metasInterface/Vendedor"
import { agruparVendedorPorMes } from "@/utils/comercial/interfaceMetas/vendedor"
import { Medal, Users } from "lucide-react" // Importe o ícone Users

type InterfaceMetaVendedorProps = {
  data: SheetInterfaceMetaVendedorFormInfo[]
}

export function InterfaceMetaVendedor({ data }: InterfaceMetaVendedorProps) {
  const vendedorPorMes = agruparVendedorPorMes(data);

  return (
    <div className="w-full rounded-lg bg-gray-900 p-6 shadow-md">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-orange-500" /> {/* Ícone de Vendedores */}
        Ranking Vendedores (% Metas)
      </h2>

      {/* Container com barra de rolagem */}
      <div className="overflow-y-auto max-h-[300px]">
        {Object.entries(vendedorPorMes).map(([mes, vendedor]) => {
          const vendedorExibidos = vendedor.slice(0, 10);

          return (
            <div key={mes} className="mb-8">
              <h3 className="text-md font-semibold text-orange-500 mb-4">{mes}</h3>

              {/* Grid com 2 colunas para os vendedor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1].map((coluna) => (
                  <div key={coluna}>
                    {vendedorExibidos.slice(coluna * 5, (coluna + 1) * 5).map((vendedor, index) => {
                      const posicao = coluna * 5 + index + 1;
                      const porcentagem = parseFloat(vendedor.concluidoMesPorcentagem.replace("%", "")) || 0;

                      // Define a medalha ou o número com base na posição
                      let indicadorPosicao;
                      if (posicao === 1) {
                        indicadorPosicao = <Medal className="w-5 h-5 text-yellow-400" />; // Medalha de ouro
                      } else if (posicao === 2) {
                        indicadorPosicao = <Medal className="w-5 h-5 text-gray-300" />; // Medalha de prata
                      } else if (posicao === 3) {
                        indicadorPosicao = <Medal className="w-5 h-5 text-yellow-600" />; // Medalha de bronze
                      } else {
                        indicadorPosicao = <span>{posicao}.</span>; // Número para os demais
                      }

                      return (
                        <div key={vendedor.id} className="flex items-center justify-between py-3 border-b border-gray-800">
                          <div className="flex items-center gap-2 flex-1">
                            {indicadorPosicao} {/* Exibe a medalha ou o número */}
                            <span>{vendedor.vendedor}</span>
                          </div>
                          <div className="flex items-center gap-2 w-32">
                            <Progress value={porcentagem} className="h-2 w-20" />
                            <span className="text-sm">{porcentagem.toFixed(0)}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}