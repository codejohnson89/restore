import { Grid2, Button } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";

export default function BasketPage() {
    const {basket} = useAppSelector(state => state.basket);



    if (!basket) return <div>There are no items in your basket</div>;

    return (
        
        <>
            <BasketTable items={basket.items} />
             <Grid2 container>
                <Grid2 size={6} />
                <Grid2 size={6}>
                    <BasketSummary />
                    <Button component={Link} to='/checkout'size="large" fullWidth variant="contained" color="primary">Proceed to Checkout</Button>
                </Grid2>
            </Grid2>
        </>

        
    )
}