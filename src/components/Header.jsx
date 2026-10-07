import { useRef, useContext } from "react";

import logo from "../assets/logo.jpg";
import Modal from "./Modal.jsx";

import { CartContext } from "../store/cart-context.jsx";

export default function Header() {
  const modal = useRef();
  const { cart } = useContext(CartContext);

  function handleOpenCartClick() {
    modal.current.open();
  }

  return (
    <>
      <Modal ref={modal} />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Plate with glasses, cutlery and napkin" />
          <h1>Reactfood</h1>
        </div>
        <nav>
          <button className="text-button" onClick={handleOpenCartClick}>
            Cart ({cart.length})
          </button>
        </nav>
      </header>
    </>
  );
}
