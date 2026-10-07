export default function OrderSuccess({ handleCloseCartClick }) {
  return (
    <>
      <h2 style={{ color: "green" }}>Order placed successfully!</h2>
      <p style={{ margin: 0 }}>Your order has been received.</p>
      <p style={{ margin: 0 }}>
        Your can track your order progress via the app.
      </p>
      <p className="modal-actions">
        <button type="button" className="button" onClick={handleCloseCartClick}>
          Close
        </button>
      </p>
    </>
  );
}
