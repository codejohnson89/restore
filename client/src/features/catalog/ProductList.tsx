import { Product } from "../../app/models/product";
import Grid  from "@mui/material/Grid2";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector((state) => state.catalog);
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                    <Grid size={4} key={product.id}>
                        {productsLoaded ? <ProductCard product={product} /> : <ProductCardSkeleton />}
                    </Grid>
                ))}
        </Grid>
    )
}