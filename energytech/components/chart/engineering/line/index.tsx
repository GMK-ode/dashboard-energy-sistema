'use client'
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";
import { entradaProjetoMes } from "@/utils/engineering/charts/linha";

interface LineChartEntradaProjetoMesProps {
  data: SheetEngBaseAnoFormPromiseInfo[];
}

export const LineChartEntradaProjetoMes = ({ data }: LineChartEntradaProjetoMesProps) => {
  // Gera os dados para o gráfico
  const LinChartData = entradaProjetoMes(data);

  const chartLineConfig = {
    month: {
      label: "Mês",
    },
    entrada: {
      label: "Entrada",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex-1 md:max-h-[400px] shadow-2xs  border-4 dark:border-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            Entrada de Projetos por Mês
          </CardTitle>
        </div>
      </CardHeader>

      {/* Remova o ChartContainer temporariamente para testar */}
      <ChartContainer className="min-h-[200px] w-full bg-background-foreground" config={chartLineConfig} >
        <LineChart data={LinChartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid vertical={false} stroke="#" />
          <XAxis
            dataKey={()=> LinChartData.map((data) => data.month.slice(0, 3))}
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tick={{ fill: "#666" }} // Cor do texto do eixo X
          />
          <YAxis
            dataKey="entrada"
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tick={{ fill: "#666" }} // Cor do texto do eixo Y
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0) {
                const data = payload[0].payload; // Dados do ponto
                return (
                  <div className="bg-background p-2 border rounded shadow">
                    <p className="text-lg">{`Entrada: ${data.entrada} - ${data.month}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px", // Espaçamento acima da legenda
            }}
          />
          <Line
            dataKey={"entrada"}
            type="natural"
            stroke="#CB6A37"
            strokeWidth={2}
            dot={true}
            name="Entrada de Projetos" // Nome exibido na legenda
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
};