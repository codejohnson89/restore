import { Button } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchAllProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded} = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchAllProductsAsync())
    }, [dispatch, productsLoaded])

    if (status.includes('pending')) return <LoadingComponent message="Loading products..."/>

    return (
        <>
            <h1>Catalog</h1>
            <ProductList products={products} />
            <Button variant="contained">Add product</Button>
        </>
    )
}