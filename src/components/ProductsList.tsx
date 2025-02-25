import { FC } from "react";
import ProductCard from "./ProductCard";

const ProductsList: FC<any> = ({products}) => {
  return <div className="product-list">{products.map((product:any) => <ProductCard key={product.id} product={product}/>)}</div>;
};

export default ProductsList;
