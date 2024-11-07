import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, id ? parseInt(id) : 0));
    const {status: productStatus} = useAppSelector(state => state.catalog)
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(x => x.productId === product?.id);

    useEffect(() => {

        if(item) setQuantity(item.quantity);


        if (id) {
            if (item) setQuantity(item.quantity);
            if (!product && id) dispatch(fetchProductAsync(parseInt(id)))
        }
    }, [id, item, product, dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if(parseInt(event.currentTarget.value) >= 0) {
            console.log('Quantity cannot be less than 0');
        setQuantity(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if (!product) return;
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product.id!, quantity: updatedQuantity}))
        }
    }

    // useEffect(() => {
    //    id && agent.Catalog.details(id)
    //     .then(res => {
    //         setProduct(res);
    //         setLoading(false);
    //     })
    //     .catch(err => console.log(err))
    //     .finally(() => setLoading(false))
    // }, [id])

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..."/>

    if (!product) return <NotFound />

    return (
        <>
            <Grid2 container spacing={6}>
                <Grid2 size={6}>
                    <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
                </Grid2>
                <Grid2 size={6}>
                    <Typography variant="h3" gutterBottom>{product.name}</Typography>
                    <Divider sx={{mb: 2}}/>
                    <Typography variant="h5" gutterBottom>${(product.price / 100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid2 container spacing={2}>
                        <Grid2>
                            <TextField 
                                variant="outlined"
                                onChange={handleInputChange}
                                type="number"
                                label="Quantity in Cart"
                                fullWidth
                                value={quantity}
                            />
                        </Grid2>
                        <Grid2>
                            <LoadingButton
                                disabled={item?.quantity === quantity || quantity === 0}
                                loading={status.includes('pending')}
                                onClick={handleUpdateCart}
                                sx={{height: '55px'}}
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                            >
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    )
}