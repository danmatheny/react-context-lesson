import React, { createContext, useState, useEffect } from 'react';

import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal,
} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  // Check local storage for cartItems
  const cartItemsFromStorage = () =>
    JSON.parse(window.localStorage.getItem('cartItems'));

  // Define our local state variables, which will be shared with other components via the context provider
  const [cartItems, setCartItems] = useState(cartItemsFromStorage() || []);
  const [hidden, setHidden] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Define the functions that will be shared via the context provider
  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));

  // The useEffect here is to update cartItemsCount and cartTotal every time there is a change to the cartItems array. We also save the array to local storage every time there is a change
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Notes:
// Here we have a complex mplementation of the Context API, fully replacing the cart portion of our Redux reducer.
// We define a context, then a component which will
// (1) Hold all the state variables in local state
// (2) Define all the utility functions needed (previously actions in redux)
// (3) Pass all those to a context provider which wraps the childen
// To use the provider, we wrap whatever needs access (in our case, the entire app, seen in index.js), then in the child component, use the useContext hook to destructure off the pieces of context needed.
