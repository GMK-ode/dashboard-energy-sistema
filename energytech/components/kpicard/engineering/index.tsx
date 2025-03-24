import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, ClipboardList, Drill, PackageCheck, ShoppingCart } from "lucide-react";


interface KpiCardEngProps {
  title: string;
  description: string;
  value: number;
}

export const KpiCardEng = ({ title, description, value }: KpiCardEngProps) => {

  const handleIconRenderByCode = (nameTitle: string) => {
    switch (nameTitle) {
      case 'Projetos':
        return <ClipboardList className="ml-auto h-5 w-5 text-orange-400" />
      case 'Aprov. Eng':
        return <ClipboardCheck className="ml-auto h-5 w-5 text-orange-400" />
      case 'Compras':
        return <ShoppingCart className="ml-auto h-5 w-5 text-orange-400" />
      case 'Montagem':
        return <Drill className="ml-auto h-5 w-5 text-orange-400" />
      case 'Entregas':
        return <PackageCheck className="ml-auto h-5 w-5 text-orange-400" />
      default:
        return ""
    }
  }
  return (
    <Card className=" shadow-2xs  border-4 dark:border-1">
      <CardHeader>
        <div className="flex items-center justify-center ">
          <CardTitle className="text-lg sm:text-xl text-orange-400 select-none">
            {title}
          </CardTitle>
          {handleIconRenderByCode(title)}
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base sm:text-lg md:text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}