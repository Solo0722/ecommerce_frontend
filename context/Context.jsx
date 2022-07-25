import React, { createContext, useState } from "react";
import { commerce } from "../lib/commerce";

export const AppContext = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const fetchProductsByCategory = async (category) => {
    const { data } = await commerce.products.list({
      category_slug: [`${category}`],
    });
    setProducts(data);
  };

  const fetchAllProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  return (
    <AppContext.Provider
      value={{
        fetchCart,
        cart,
        fetchProductsByCategory,
        products,
        handleRemoveFromCart,
        handleEmptyCart,
        handleAddToCart,
        handleUpdateCartQty,
        fetchAllProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
