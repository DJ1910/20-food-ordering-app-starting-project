import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

const Modal = forwardRef(function Modal(props, ref) {
  const [showForm, setShowForm] = useState(false);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleCloseCartClick() {
    dialog.current.close();
    setShowForm(false);
  }

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={handleCloseCartClick}>
      {!showForm && (
        <Cart
          handleCloseCartClick={handleCloseCartClick}
          setShowForm={setShowForm}
        />
      )}
      {showForm && <CheckoutForm handleCloseCartClick={handleCloseCartClick} />}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
