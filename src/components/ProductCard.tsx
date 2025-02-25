import { useContext, FC } from "react";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/cart";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { cart, dispatch } = useContext(CartContext)!;

  const itemInCart = cart.find((item) => item.id === product.id);
  const finalPrice =
    product.price - (product.discountPercentage * product.price) / 100;

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <div className="product-info">
        <p className="product-title">{product.title}</p>
        <p className="price">
          {product.discountPercentage > 0 && (
            <span className="original-price">${product.price}</span>
          )}
          ${finalPrice.toFixed(2)}
        </p>
      </div>

      {itemInCart ? (
        <div className="cart-controls">
          <button
            onClick={() =>
              dispatch({ type: "DECREASE_QUANTITY", payload: product.id })
            }
          >
            -
          </button>
          <span>{itemInCart.quantity}</span>
          <button
            onClick={() =>
              dispatch({ type: "INCREASE_QUANTITY", payload: product.id })
            }
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          className="add-to-cart"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
