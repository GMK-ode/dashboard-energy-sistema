import * as React from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,

} from '@mui/x-charts/Gauge';
import { GaugePointer } from './pointer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export const IndicadorGaugeVelocidade = () => {

  return (
    <Card >
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-orange-400 select-none">
          Metas Conluídas
        </CardTitle>

        <CardDescription>
          Indice de metas do concluídas ate o momento
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <GaugeContainer
          width={200}
          height={100}
          startAngle={-110}
          endAngle={110}
          value={30}
          valueMax={100}
          valueMin={0}
          >
          <GaugeReferenceArc />
          <GaugeValueArc />
          <GaugePointer />
        </GaugeContainer>
      </CardContent>
    </Card>
  )
}