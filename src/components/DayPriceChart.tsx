import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  // Label,
} from 'recharts';
import { Price } from '../types';

interface DayPriceChartProps {
  data: Price[];
  showTax: boolean;
  getCurrentPriceAndTime: () => Price;
  today?: boolean;
}
function DayPriceChart({
  data,
  showTax,
  getCurrentPriceAndTime,
  today,
}: DayPriceChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'c/kWh', position: 'top' }} />
          <Tooltip />
          {today && (
            <ReferenceLine x={getCurrentPriceAndTime().time} stroke="black">
              {/* <Label position={'top'}>
              Current price: {getCurrentPriceAndTime().price.toString()}
            </Label> */}
            </ReferenceLine>
          )}
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          {showTax && (
            <Line
              type="monotone"
              dataKey="priceWithTax"
              stroke="#82ca9d"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DayPriceChart;
