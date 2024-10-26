import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";


export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading products..."/>

    return (
        <>
            <h1>Catalog</h1>
            <ProductList products={products} />
            <Button variant="contained">Add product</Button>
        </>
    )
}