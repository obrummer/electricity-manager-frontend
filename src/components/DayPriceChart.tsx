import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Price } from '../types';

interface DayPriceChartProps {
  data: Price[];
}
function DayPriceChart({ data }: DayPriceChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            label={{ value: 'c/kWh', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="grey"
            fill="lightgrey"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DayPriceChart;
