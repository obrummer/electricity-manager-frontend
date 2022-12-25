import Grid from '@mui/material/Grid';
import { useGetIndicatorsQuery } from '../features/prices/pricesAPI';
import IndicatorCard from '../components/IndicatorCard';

function IndicatorContainer() {
  const { data, isLoading, isError } = useGetIndicatorsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong</div>;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard
          title={'Average price today'}
          value={data.averagePriceToday}
          percentage={data.priceDifferencePercentage}
        />
      </Grid>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard title={'Current price'} value={data.currentPrice} />
      </Grid>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard
          title={'Highest price today'}
          value={data.todayHighestPrice}
        />
      </Grid>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard
          title={'Lowest price today'}
          value={data.todayLowestPrice}
        />
      </Grid>
    </Grid>
  );
}

export default IndicatorContainer;
