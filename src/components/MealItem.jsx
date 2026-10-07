import { useContext } from "react";

import { CartContext } from "../store/cart-context.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function MealItem({ id, image, name, price, description }) {
  const { addMealToCart } = useContext(CartContext);

  return (
    <article>
      <img src={`http://localhost:3000/${image}`} alt={title} />
      <div>
        <h3>{name}</h3>
        <p className="meal-item-price">{currencyFormatter.format(price)}</p>
        <p className="meal-item-description">{description}</p>
      </div>

      <p className="meal-item-actions">
        <button
          className="button"
          onClick={() => addMealToCart({ id, name, price, quantity: 1 })}
        >
          Add to Cart
        </button>
      </p>
    </article>
  );
}
