import { useState } from 'react';
import DayPriceChart from '../components/DayPriceChart';
import {
  useGetPricesQuery,
  useGetTomorrowPricesQuery,
  useGetYesterdayPricesQuery,
} from '../features/prices/pricesAPI';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const PriceChartContainer = () => {
  const [alignment, setAlignment] = useState<string>('today');
  const [showTax, setShowTax] = useState<boolean>(false);
  const { data: today, isLoading, isError } = useGetPricesQuery();
  const {
    data: tomorrow,
    isLoading: isLoadingTomorrow,
    isError: errorTomorrow,
  } = useGetTomorrowPricesQuery();
  const {
    data: yesterday,
    isLoading: isLoadingYesterday,
    isError: errorYesterday,
  } = useGetYesterdayPricesQuery();

  const dataType = (alignment: string) => {
    if (alignment === 'today' && today) {
      return today;
    }
    if (alignment === 'tomorrow' && tomorrow) {
      return tomorrow;
    }
    if (alignment === 'yesterday' && yesterday) {
      return yesterday;
    }
    return [];
  };

  const getCurrentPriceAndTime = () => {
    const getCurrentHour = dayjs().hour();
    const currentItem = () => {
      if (today) {
        return today.find(
          (item) => item.time === `${getCurrentHour.toString()}:00`,
        );
      }
    };
    return currentItem() || { price: 0, time: '', date: '', priceWithTax: 0 };
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  if (isLoading || isLoadingTomorrow || isLoadingYesterday) {
    return <div>Loading...</div>;
  }

  if (
    isError ||
    errorTomorrow ||
    errorYesterday ||
    !today ||
    !tomorrow ||
    !yesterday
  ) {
    return <div>Something went wrong</div>;
  }
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            paddingTop: 0.9,
          }}
        >
          <Typography sx={{ fontSize: 14 }}>
            Date: {dataType(alignment)[0].date}{' '}
          </Typography>
        </Grid>
        <Grid item xs={4} md={4}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showTax}
                  id="toggle-tax"
                  onChange={() => setShowTax(!showTax)}
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>Show tax</Typography>}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={4} md={4}>
          <ToggleButtonGroup
            sx={{
              float: 'right',
            }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            size="small"
          >
            <ToggleButton id="toggle-reduce-day" value="yesterday">
              - 1
            </ToggleButton>
            <ToggleButton id="toggle-today" value="today">
              Today
            </ToggleButton>
            <ToggleButton
              id="toggle-add-day"
              value="tomorrow"
              disabled={tomorrow.length <= 1}
            >
              + 1
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <DayPriceChart
        data={dataType(alignment)}
        showTax={showTax}
        getCurrentPriceAndTime={getCurrentPriceAndTime}
        today={alignment === 'today'}
      />
    </>
  );
};

export default PriceChartContainer;
