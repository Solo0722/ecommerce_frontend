import React, { createContext, useState } from "react";
import { commerce } from "../lib/commerce";

export const AppContext = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState(null);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(null);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        fetchCart,
        fetchProductsByCategory,
        handleRemoveFromCart,
        handleEmptyCart,
        handleAddToCart,
        handleUpdateCartQty,
        fetchAllProducts,
        setCheckoutToken,
        setShippingData,
        handleCaptureCheckout,
        shippingData,
        order,
        errorMessage,
        products,
        cart,
        checkoutToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
