import { useContext, FC } from "react";
import { CartContext } from "../context/CartContext";

const Cart: FC = () => {
  const { cart, dispatch } = useContext(CartContext)!;

  const totalPrice = cart.reduce((acc, item) => {
    const discountedPrice =
      item.price - (item.discountPercentage * item.price) / 100;
    return acc + discountedPrice * item.quantity!;
  }, 0);

  return (
    <div className="cart-container">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="product-name">
                    <div className="product-title-cart">{item.title}</div>
                    <p className="price">
                      {item.discountPercentage > 0 && (
                        <span className="original-price">${item.price}</span>
                      )}
                      $
                      {(
                        item.price -
                        (item.discountPercentage * item.price) / 100
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="control-container">
                  <div className="cart-controls">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QUANTITY",
                          payload: item.id,
                        })
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_QUANTITY",
                          payload: item.id,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: <span>${totalPrice.toFixed(2)}</span></p>
        </>
      )}
    </div>
  );
};

export default Cart;
