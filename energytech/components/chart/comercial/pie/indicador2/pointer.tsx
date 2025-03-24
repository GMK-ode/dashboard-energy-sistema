import * as React from 'react';
import {
  useGaugeState,
} from '@mui/x-charts/Gauge';

export const GaugePointer = () => {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  const percentage = ((valueAngle + 110) / 220) * 100;
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#CB6A37" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="#CB6A37"
        strokeWidth={3}
      />
      <text
        x={target.x}
        y={target.y + 20}
        textAnchor="middle"
        fill="#CB6A37"
        fontSize="12"
      >
        <p className='text-3xl '>{`${percentage.toFixed(2)}%`}</p>
      </text>
    </g>
  );
}