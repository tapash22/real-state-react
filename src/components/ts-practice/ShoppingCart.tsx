import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const INITIAL_CART: CartItem[] = [
  { id: "1", name: "Mechanical Keyboard", price: 120, quantity: 1 },
  { id: "2", name: "Wireless Mouse", price: 60, quantity: 2 },
  { id: "3", name: "USB-C Cable", price: 15, quantity: 1 },
];

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const totalPrice = cart.reduce(
    (accum, item) => accum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item: CartItem) => (
        <div
          key={item.id}
          style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
        >
          <span>
            {item.name} (${item.price}) - Qty: {item.quantity}
          </span>
          <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
          <button onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
        </div>
      ))}
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
};
