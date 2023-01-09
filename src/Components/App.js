import { useState, useEffect } from "react";
import Banner from "./Banner";
import logo from "../assets/logo.png";
import Cart from "./Cart";
import Footer from "./Footer";
import ShoppingList from "./ShoppingList";
import "../styles/Layout.css";

function App() {
  const savedCart = localStorage.getItem("cart");

  const [isOpen, setIsOpen] = useState(true);

  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [modalcart, updateModalCart] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Banner>
        <img src={logo} alt="logo-la-maison-jungle" className="lmj-logo" />
        <h1 className="lmj-title">La maison jungle</h1>
      </Banner>
      <div className="lmj-layout-inner">
        <Cart
          cart={cart}
          updateCart={updateCart}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ShoppingList
          cart={cart}
          modalcart={modalcart}
          updateModalCart={updateModalCart}
          isOpen={isOpen}
          updateCart={updateCart}
          setIsOpen={setIsOpen}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
