import { useEffect } from "react";
import "../styles/Cart.css";

function Cart({ cart, updateCart, setIsOpen, isOpen }) {
  const total = cart.reduce(
    (acc, plantType) => +acc + plantType.amount * plantType.price,
    0
  );

  function reduceCart(name, price, cover) {
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { name, price, cover, amount: currentPlantSaved.amount - 1 },
      ]);
    } else {
      updateCart([...cart, { name, price, cover, amount: 1 }]);
    }
  }

  function deleteCart(name, price) {
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([...cartFilteredCurrentPlant]);
    } else {
      updateCart([...cart, { name, price, amount: 0 }]);
    }
  }

  useEffect(() => {
    document.title = `LMJ: ${total}€ d'achats`;
  }, [total]);

  return isOpen ? (
    <div className="lmj-cart">
      <button
        className="lmj-cart-toggle-button"
        onClick={() => setIsOpen(false)}
      >
        Fermer
      </button>
      {cart.length > 0 ? (
        <div>
          <h2>Panier</h2>

          {cart.map(({ name, price, amount, cover, text }, index) => (
            <div
              className="cart-container"
              style={{
                transform:
                  amount === 0 ? "translateX(-200px)" : "translateX(0)",
              }}
              key={`${name}-${index}`}
            >
              <img className="cart-panier" src={cover} alt={`${name} cover`} />
              <br />
              {name} {price}€ x {amount}
              <br />
              <button
                className="boutonR"
                onClick={() => reduceCart(name, price, cover)}
                style={{
                  transform:
                    amount === 0 ? "translateX(-200px)" : "translateX(0)",
                }}
              >
                -1
              </button>
              <button
                className="boutonD"
                onClick={() => deleteCart(name, price)}
                style={{
                  transform:
                    amount === 0 ? "translateX(-200px)" : "translateX(0)",
                }}
              >
                X
              </button>
            </div>
          ))}

          <h3>Total :{total}€</h3>
          <button
            onClick={() => updateCart([])}
            style={{
              transform: total === 0 ? "translateX(-200px)" : "translateX(0)",
            }}
          >
            Vider le panier
          </button>
        </div>
      ) : (
        <div>Votre panier est vide</div>
      )}
    </div>
  ) : (
    <div className="lmj-cart-closed">
      <button
        className="lmj-cart-toggle-button"
        onClick={() => setIsOpen(true)}
      >
        Ouvrir le Panier
      </button>
    </div>
  );
}

export default Cart;
