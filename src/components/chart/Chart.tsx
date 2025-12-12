import { useTranslation } from 'react-i18next';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useChart } from './useChart';

interface ChartProps {
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const { data } = useChart();

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" name={t('chart.date')} padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          name={t('chart.sendPackage')}
          dataKey="shipperOrders"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" name={t('chart.rentLocker')} dataKey="userOrders" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
