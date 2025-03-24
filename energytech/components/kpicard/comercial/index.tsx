import { DollarSign, ArrowUp, ArrowDown, Euro, Pickaxe } from "lucide-react"
import { LineChartKpiCotacao } from "../../chart/comercial/kpi/line"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card"


interface KpiCardComercialProps {
  code: string;
  name: string;
  bid: string;
  varBid: string;
  coin: string;
}

export const KpiCardComercial = ({ code, name, bid, varBid, coin }: KpiCardComercialProps) => {

  const handleIconRenderByCode = (code: string) => {
    switch (code) {
      case 'USD':
        return <DollarSign className="ml-auto h-5 w-5 text-orange-400" />
      case 'EUR':
        return <Euro className="ml-auto h-5 w-5 text-orange-400" />
      case 'XAU':
        return <Pickaxe className="ml-auto h-5 w-5 text-orange-400" />
      case 'XAG':
        return <Pickaxe className="ml-auto h-5 w-5 text-orange-400" />
      default:
        return <DollarSign className="ml-auto h-5 w-5 text-orange-400" />
    }
  }

  return (
    <Card >
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-orange-400 select-none">
            Cotação {code}
          </CardTitle>
          {handleIconRenderByCode(code)}
        </div>
        <CardDescription>
          {name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex sm:flex-col  sm:justify-center sm:items-center md:justify-center md:items-center lg:flex-row ">
          <div className="flex flex-col gap-1 items-center justify-center">
            <p className="text-base sm:text-3xl font-bold">{bid}</p>
            {Number(varBid) > 0 ? (
              <p className="text-base sm:text-lg font-bold flex gap-1 justify-baseline items-center text-green-500"> <ArrowUp /> {varBid}</p>
            ) : (
              <p className="text-base sm:text-lg font-bold flex gap-1 justify-baseline items-center text-red-500"> <ArrowDown /> {varBid}</p>
            )}
          </div>
          <LineChartKpiCotacao coin={coin} />
        </div>
      </CardContent>
    </Card>
  )
}