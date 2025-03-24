'use client'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DailyCoinCotation } from "@/interfaces/awesomeapi/coinDaily"
import { getCoinDaily } from "@/services/awesomeapi/coindaily"
import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart } from "recharts"

interface LineChartKpiCotacaoProps {
  coin: string;
}

export const LineChartKpiCotacao = ({ coin }: LineChartKpiCotacaoProps)  => {
  const [cotacao, setCotacao] = useState<DailyCoinCotation>([]);
  const [loading, setLoading] = useState(true);

  const handleSelect = async () => {
    try {
      setLoading(true);
      const response = await getCoinDaily(coin, 30);
      setCotacao(response); 
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSelect();
  }, []);

  const chartData: DailyCoinCotation = cotacao;

  const chartConfig = {
    bid: {
      label: "Bid",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="w-sm md:w-max lg:w-full h-[60px] bg-background-forground">
      <LineChart 
        accessibilityLayer
        data={chartData as any}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} stroke="transparent"/>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="bid"
          type="natural"
          stroke="#CB6A37"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
