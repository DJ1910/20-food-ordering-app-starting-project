import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx";
import { currencyFormatter } from "../util/formatting.js";

import ErrorBox from "./ErrorBox.jsx";
import OrderSuccess from "./OrderSuccess.jsx";
import useHttp from "../hooks/useHttp.jsx";
import Input from "./Input.jsx";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckoutForm({ handleCloseCartClick }) {
  const {
    data: formSubmitted,
    isLoading: isFormSubmitting,
    fetchError: submitError,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", config, undefined);

  const { cart, resetCart } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = currencyFormatter.format(
    formSubmitted ? 0 : totalPrice
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDetails = Object.fromEntries(formData.entries());
    const data = { items: cart, customer: formDetails };
    const requestData = { order: data };

    const hasError = await sendRequest(JSON.stringify(requestData));

    if (!hasError) {
      resetCart();
    }
  }

  return (
    <>
      {formSubmitted && (
        <OrderSuccess handleCloseCartClick={handleCloseCartClick} />
      )}
      {!formSubmitted && (
        <div>
          <h2>Checkout</h2>
          <p>Total Amount: {formattedTotalPrice}</p>
          {submitError && <ErrorBox title="Error" message={submitError} />}
          <form onSubmit={handleSubmit}>
            <Input id="name" label="Full Name" type="text" />
            <Input id="email" label="E-Mail Address" type="email" />
            <Input id="street" label="Street" type="text" />
            <div className="control-row">
              <Input id="postal-code" label="Postal Code" type="number" />
              <Input id="city" label="City" type="text" />
            </div>
            {isFormSubmitting && (
              <p style={{ color: "blue" }}>Creating order...</p>
            )}

            <p className="modal-actions" key={isFormSubmitting}>
              <button
                type="button"
                className="text-button"
                onClick={handleCloseCartClick}
                disabled={isFormSubmitting}
                style={{
                  color: `${isFormSubmitting ? "gray" : null}`,
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="button"
                disabled={isFormSubmitting}
                style={{
                  backgroundColor: `${isFormSubmitting ? "gray" : null}`,
                }}
              >
                Submit Order
              </button>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
