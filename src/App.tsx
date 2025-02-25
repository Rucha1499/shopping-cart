import { useEffect, useState } from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import { PRODUCTS_URL } from "./utils/constants";
import CartProvider from "./context/CartContext";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(PRODUCTS_URL);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <div className="app">
        <div className="navbar">Shopping Cart 🛒</div>
        <div className="shopping-cart">
          <Cart />
          <div>
            {error ? (
              <div>{error}</div>
            ) : loading ? (
              <div>Loading products...</div>
            ) : (
              <ProductsList products={products} />
            )}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
