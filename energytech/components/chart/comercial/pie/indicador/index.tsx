import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SheetIndiceMetasFormInfo } from "@/interfaces/microsoft/excel/dadosSheets/comercial/indicesMetas";
import { IndicadorGuageMetas } from "@/utils/comercial/indicador";
import React from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

interface Pie180Props {
  data: SheetIndiceMetasFormInfo[];
}

export const Pie180IndicadorMetaConluida = ({ data }: Pie180Props) => {
  const dataGrafico = IndicadorGuageMetas(data) || { previsto: 0, concluido: 0, metaConluida: 0 };
  const chartData = [{ previsto: dataGrafico.previsto, concluido: dataGrafico.concluido }];
  const chartConfig = {
    concluido: {
      label: "Concluido",
      color: "#CB6A37",
    },
    previsto: {
      label: "Previsto",
      color: "#0047ab",
    },
  } satisfies ChartConfig;

  return (
    <Card className="lg:h-[220px]  shadow-2xs  border-4 dark:border-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            Meta de Vendas
          </CardTitle>
        </div>
        <CardDescription>
          Indice de metas Ano
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="lg:h-full ">
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={90}
          outerRadius={50}
          className="w-full h-full"
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {Number(dataGrafico.metaConluida)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground"
                      >
                        metas concluídas
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="previsto"
            fill="var(--color-previsto)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="concluido"
            stackId="a"
            cornerRadius={5}
            fill="var(--color-concluido)"
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </Card>
  );
};