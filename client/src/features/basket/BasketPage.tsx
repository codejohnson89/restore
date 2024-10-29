import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid2, Button } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
const {basket, setBasket, removeItem} = useStoreContext();
const [status, setStatus] = useState({
    loading: false,
    name: '',
});

function handleAddItem(productId: number, name: string) {
    setStatus({loading: true, name});
    agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}));
}

function handleRemoveItem(productId: number, quantity: number = 1, name: string) {
    setStatus({loading: true, name})
    agent.Basket.removeItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}));
}

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
                                loading={status.loading && status.name === 'rem' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)} 
                                color="error">
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton 
                                loading={status.loading && status.name === 'rem' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)} 
                                color="secondary">
                                <Add />
                            </LoadingButton>
                            </TableCell>
                        <TableCell align="right">{((item.price / 100 ) * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status.loading && status.name === 'del' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)} 
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