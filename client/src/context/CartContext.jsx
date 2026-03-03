import { Children, createContext, useContext, useEffect, useState } from "react"


const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {

    setCart(prevCart => {
      const exist = prevCart.find(p => p._id === product._id);

      if (exist) {
        return prevCart.map(p =>
          p._id === product._id ?
            { ...p, qty: Math.min(p.qty + qty, product.stock) } : p
        );
      }

      return [...prevCart,
      {
        ...product,
        qty: Math.min(qty, product.stock)
      }
      ];
    });

  };

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p._id !== id));
  };

  const updateQty = (id, qty) => {

    if (qty < 1) return;
    setCart(
      cart.map(p => p._id === id ?
        {
          ...p,
          qty: Math.min(qty, p.stock)
        }
        : p
      )
    );
  };

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart ,totalQty}}
    >
      {children}
    </CartContext.Provider>
  );

};

export const useCart = () => useContext(CartContext);

