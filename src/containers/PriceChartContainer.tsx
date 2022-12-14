import DayPriceChart from '../components/DayPriceChart';
import { useGetPricesQuery } from '../features/prices/pricesAPI';

const PriceChartContainer = () => {
  const { data, isLoading, isError } = useGetPricesQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong</div>;
  }
  return <DayPriceChart data={data} />;
};

export default PriceChartContainer;
