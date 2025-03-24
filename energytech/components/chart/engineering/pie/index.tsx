"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

// Interface para os dados das fases
interface FasesProjetos {
  projConcluidos: number;
  projEmAtraso: number;
  projEmDia: number;
  projFaturados: number;
}

// Props do componente
interface PieChartStatusGeralProps {
  fases: FasesProjetos;
}

const chartConfig = {
  porcentagem: {
    label: "porcentagem",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export const PieChartStatusGeral = ({ fases }: PieChartStatusGeralProps) => {
  const chartData = [
    { status: "Em dia", porcentagem: fases.projEmDia, fill: "var(--color-chrome)" },
    { status: "Concluído", porcentagem: fases.projConcluidos, fill: "var(--color-safari)" },
    { status: "Faturado", porcentagem: fases.projFaturados, fill: "var(--color-edge)" },
    { status: "Em atraso", porcentagem: fases.projEmAtraso, fill: "var(--color-other)" },
  ];

  // Calcular o total de projetos
  const totalPorcentagem = chartData.reduce((sum, item) => sum + item.porcentagem, 0);

  // Adicionar a porcentagem a cada item
  const dataWithPercentage = chartData.map((item) => ({
    ...item,
    percentage: ((item.porcentagem / totalPorcentagem) * 100).toFixed(2) + "%", // Formatar para 2 casas decimais
  }));

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            Status Geral
          </CardTitle>
        </div>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full min-h-[300px]">
        <PieChart>
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="porcentagem"
            nameKey="status"
            innerRadius={60}
            label={(entry) => entry.status} // Exibir o status como rótulo
            labelLine={false}
          >
            {dataWithPercentage.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} /> // Aplicar cores personalizadas
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </Card>
  );
};