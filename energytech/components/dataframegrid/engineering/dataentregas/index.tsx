import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";
import { prazoEntrega } from "@/utils/engineering/interfacesDados/entregas";
import { BellRing } from "lucide-react";
import { useState, useEffect } from "react";

interface EntregasAvisosProps {
  data: SheetEngBaseAnoFormPromiseInfo[];
}

const getMonthName = (month: number): string => {
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return monthNames[month - 1];
};

export const EntregasAvisos = ({ data }: EntregasAvisosProps) => {
  const [dataEntregaMes, setDataEntregaMes] = useState<string>('');
  const [groupedEntregas, setGroupedEntregas] = useState<{ monthYear: string, entregas: { dataEntrega: string, pvComPrazo: string }[] }[]>([]);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    setDataEntregaMes(getMonthName(currentMonth));

    const response = prazoEntrega(data);

    const formattedResponse = response.dataEntrega
      .map((dataEntrega, index) => ({
        dataEntrega,
        pvComPrazo: response.pvComPrazo[index],
      }))
      .filter((entrega) => {
        const [day, month, year] = entrega.dataEntrega.split('/').map(Number);
        const entregaDate = new Date(year, month - 1, day);
        const today = new Date(currentYear, currentMonth - 1, currentDay);
        return entregaDate >= today; 
      })
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.dataEntrega.split('/').map(Number);
        const [dayB, monthB, yearB] = b.dataEntrega.split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
      });

   

    const grouped = formattedResponse.reduce((acc, entrega) => {
      const [day, month, year] = entrega.dataEntrega.split('/').map(Number);
      const monthName = getMonthName(month);
      const key = `${monthName} ${year}`;

      const existingGroup = acc.find((group) => group.monthYear === key);
      if (existingGroup) {
        existingGroup.entregas.push(entrega);
      } else {
        acc.push({ monthYear: key, entregas: [entrega] });
      }
      return acc;
    }, [] as { monthYear: string, entregas: { dataEntrega: string, pvComPrazo: string }[] }[]);

    setGroupedEntregas(grouped);
  }, [data, currentDay, currentMonth, currentYear]);

  return (
    <Card className="flex-1 h-[400px] overflow-hidden-y">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-orange-400">
            Entregas a partir de {dataEntregaMes}
          </CardTitle>
        </div>
        <CardDescription>
          Próximas entregas a serem realizadas
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[300px] overflow-y-auto">
        {groupedEntregas.length > 0 ? (
          groupedEntregas.map((group) => (
            <div key={group.monthYear}>
              <h2 className="text-sm font-bold mt-1 mb-2 text-orange-400">{group.monthYear}</h2>
              {group.entregas.map((entrega, index) => (
                <article key={index} className="flex items-center gap-2 border-b py-2">
                  <h1 className="bg-green-400 rounded-3xl p-2 font-bold font-mono text-black">
                    PV: {entrega.pvComPrazo}
                  </h1>
                  {entrega.dataEntrega !== '' ? (
                    <h1 className="bg-red-400 rounded-3xl p-2 font-bold font-mono text-black">
                      Entrega: {entrega.dataEntrega}
                    </h1>
                  ) : (
                    <h1 className="bg-amber-300 rounded-3xl p-2 font-bold font-mono text-black">
                      Entrega: Sem data
                    </h1>
                  )}
                  <BellRing className="ml-auto h-8 w-8 text-orange-400" />
                </article>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma entrega para os próximos meses.</p>
        )}
      </CardContent>
    </Card>
  );
};