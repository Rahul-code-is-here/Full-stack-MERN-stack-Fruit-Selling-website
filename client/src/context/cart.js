import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");  // refresh thavathi vyu jatu tu ene badle local storage ma data store reshe but problem e che ke button thi remove karya pachi cart ma fari url thi jaie to remove item pachi aavi jai che so CartPage.js button ma onclick ma je remove nu func che tema local storage ne be remove kri leshu  
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
