'use client'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno"
import { graficoBarraPendencia } from "@/utils/engineering/charts/barra"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

const chartConfig = {
  pendencia: {
    label: "Pendências",
    color: "orange"
  },
  total: {
    label: "total",
    color: "orange",
  },
  mobile: {
    label: "Mobile",
    color: "orange",
  },
  label: {
    color: "red",
  },
} satisfies ChartConfig

interface BarHorizontalPendenciasProps {
  data: SheetEngBaseAnoFormPromiseInfo[]
}

export const BarHorizontalPendencias = ({data}: BarHorizontalPendenciasProps) => {
  const chartData = graficoBarraPendencia(data)
  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            Quantidade de Pendências em cada Processo
          </CardTitle>
        </div>
      </CardHeader>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            top: 20,    // Margem superior
            right: 30,  // Margem direita
            left: 20,    // Margem esquerda
            bottom: 5,   // Margem inferior
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="pendencias"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="total" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="total"
            layout="vertical"
            fill="#CB6A37"
            className="bg-orange-400"
            radius={4}
          >
            <LabelList
              dataKey="pendencias"
              position="insideLeft"
              offset={8}
              fill="white"
              className="bg-orange-400"
              fontSize={15}
            />
            <LabelList
              dataKey="total"
              position="right"
              offset={8}
              fill="white"
              className="text-yellow-600"
              fontSize={15}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </Card>
  )
}