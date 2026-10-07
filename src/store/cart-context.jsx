import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addMealToCart: () => {},
  updateCartMealQuantity: () => {},
  resetCart: () => {},
});

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddMealToCart(value) {
    setCartItems((prevCartItems) => {
      if (prevCartItems.findIndex((item) => item.id === value.id) === -1) {
        return [value, ...prevCartItems];
      }

      return [...prevCartItems];
    });
  }

  function handleCartQuantityUpdate(id, value) {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems];

      const index = newCartItems.findIndex((item) => item.id === id);

      const updatedItem = { ...newCartItems[index] };
      updatedItem.quantity += value;

      if (updatedItem.quantity <= 0) {
        newCartItems.splice(index, 1);
      } else {
        newCartItems[index] = updatedItem;
      }

      return newCartItems;
    });
  }

  function resetCart() {
    setCartItems([]);
  }

  const contextValue = {
    cart: cartItems,
    addMealToCart: handleAddMealToCart,
    updateCartMealQuantity: handleCartQuantityUpdate,
    resetCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
