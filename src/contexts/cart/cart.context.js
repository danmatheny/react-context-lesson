import { createContext } from 'react';

const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
});

export default CartContext;

// The cart context is slightly more complicated. We create the context with a default object, because we need both a value (hidden boolean) and a function to change the value (toggleHidden). Notice that we do not write the toggleHidden function here.  Just like the value, this function will be written as part of a component's local state, and passed to the context via a context provider.
