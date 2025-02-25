import { FC } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/cart";

const ProductsList: FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
