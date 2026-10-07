export default function CartItem({
  item,
  formattedPrice,
  updateCartMealQuantity,
}) {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {formattedPrice}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => updateCartMealQuantity(item.id, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateCartMealQuantity(item.id, 1)}>+</button>
      </p>
    </li>
  );
}
