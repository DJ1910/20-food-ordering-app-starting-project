import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx";
import { currencyFormatter } from "../util/formatting.js";
import CartItem from "./CartItem.jsx";

export default function Cart({ handleCloseCartClick, setShowForm }) {
  const { cart, updateCartMealQuantity } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>No items in cart!</p>}
      {cart.length > 0 && (
        <ul>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              formattedPrice={currencyFormatter.format(item.price)}
              updateCartMealQuantity={updateCartMealQuantity}
            />
          ))}
        </ul>
      )}
      <p className="cart-total">
        Cart Total: {currencyFormatter.format(totalPrice)}
      </p>
      <p className="modal-actions">
        <button
          type="button"
          className="text-button"
          onClick={handleCloseCartClick}
        >
          Close
        </button>
        {cart.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setShowForm(true)}
          >
            Go to Checkout
          </button>
        )}
      </p>
    </div>
  );
}
