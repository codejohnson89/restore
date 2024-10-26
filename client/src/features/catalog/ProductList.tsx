import { Product } from "../../app/models/product";
import Grid  from "@mui/material/Grid2";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                    <Grid size={3} key={product.id}>
                        <ProductCard key={product.id} product={product} />
                    </Grid>
                ))}
        </Grid>
    )
}