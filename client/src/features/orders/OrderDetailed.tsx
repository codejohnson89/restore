import { Box, Typography, Button, Grid } from "@mui/material";
import { Order } from "../../app/models/order";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({order, setSelectedOrder}: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='h4'>Order# {order.id}</Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{mb: 2}} size="large" variant="contained">Back</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            <Grid container>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    )
}