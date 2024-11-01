import { Grid2, Paper } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchAllProductsAsync, fetchFilters, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductSearch from "./ProductSearch";
import RadionButtonGroup from "../../app/components/RadioButtonGroups";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
    {value: 'name', label: 'Name: A-Z'},
    {value: 'priceDesc', label: 'Price: High to Low'},
    {value: 'price', label: 'Price: Low to High'}, 
]


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, brands, types, productParams, metaData} = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchAllProductsAsync())
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <LoadingComponent message="Loading products..."/>

    return (
        <>
            <h1>Catalog</h1>
            <Grid2 container columnSpacing={4}>
                <Grid2 size={3}>
                    <Paper sx={{mb: 2}}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <RadionButtonGroup 
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e: any) => dispatch(setProductParams({orderBy: e.target.value}))}
                        />
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <CheckboxButtons
                            items={brands}
                            checked={productParams.brands}
                            onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}/>
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <CheckboxButtons
                                items={types}
                                checked={productParams.types}
                                onChange={(items: string[]) => dispatch(setProductParams({types: items}))}/>
                    </Paper>
                </Grid2>
                <Grid2 size={9}>
                    <ProductList products={products} />
                </Grid2>
                <Grid2 size={3} />
                <Grid2 size={9} sx={{mb:2}}>
                    {metaData && 
                        <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}/>
                    }
                </Grid2>
            </Grid2>
        </>
    )
}