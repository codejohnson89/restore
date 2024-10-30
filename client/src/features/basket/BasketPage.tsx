import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid2, Button } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();



    if (!basket) return <div>There are no items in your basket</div>;

    return (
        
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket.items.map((item) => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                            <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                            <Box ml={2}>{item.name}</Box>
                            </Box>
                        </TableCell>
                        <TableCell align="right">{(item.price / 100).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                                onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))} 
                                color="error">
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton 
                                loading={status === 'pendingAddItem' + item.productId} 
                                onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} 
                                color="secondary">
                                <Add />
                            </LoadingButton>
                            </TableCell>
                        <TableCell align="right">{((item.price / 100 ) * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status ==='pendingRemoveItem' + item.productId + 'del'} 
                                onClick={() => dispatch(removeBasketItemAsync({
                                    productId: item.productId, quantity: item.quantity, name: 'del'
                                }))} 
                                color="error">
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
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