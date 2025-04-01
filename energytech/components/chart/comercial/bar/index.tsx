'use client'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SheetComMetsGeralFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/metas"
import { barMetaAnoDadosInterface } from "@/utils/comercial/charts/interfaceDados"
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts"

interface BarMetaAnoProps {
  title: string;
  data: SheetComMetsGeralFormInfo[];
}

export const BarMetaAno = ({ title, data }: BarMetaAnoProps) => {
  // Processa os dados para o gráfico
  const {  dados, mediaPrevista } = barMetaAnoDadosInterface(data);

  const chartConfig = {
    previsto: {
      label: "Previsto",
      color: "hsl(var(--chart-1))",
    },
    realizado: {
      label: "Realizado",
      color: "#087829",
    },
    mediaPrevista: {
      label: "% Concluída",
      color: "#087829",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex-1 md:max-h-[400px]  shadow-2xs border-4 dark:border-1 ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ComposedChart
          width={500}
          height={400}
          data={dados} // Slicing data to only include the first 12 months
          margin={{
            top: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid className="bg-accent-foreground"/>
          <XAxis dataKey={() => dados.map((item) => item.mes.slice(0,3))} />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          {/* Gráfico de área para a meta prevista */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="previsto"
            fill="#CB6A37"
            stroke="#CB6A37"
            name="Previsto Mês(%)"
          />
          {/* Barras para o realizado */}
          <Bar yAxisId="left" dataKey="realizado" barSize={20} fill="currentColor"  name="Realizado (%)" className=" text-slate-900 dark:text-white-400  dark:bg-white-400"/>
          {/* Linha para a % Concluída */}
          <Line yAxisId="right" type="monotone" dataKey={() => mediaPrevista} stroke="#087829" name="Media Prevista Ano(%)" />
        </ComposedChart>
      </ChartContainer>
    </Card>
  );
};