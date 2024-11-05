import { Grid2, Typography } from '@mui/material';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { useAppSelector } from '../../app/store/configureStore';


export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable isBasket={false} items={basket.items} />}
      <Grid2 container>
        <Grid2 size={6} />
        <Grid2 size={6}>
          <BasketSummary />
        </Grid2>
      </Grid2>
    </>
  );
}