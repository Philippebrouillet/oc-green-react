import { useState } from "react";
import { plantList } from "../datas/plantList";
import PlantItem from "./PlantItem";
import Categories from "./Categories";
import "../styles/ShoppingList.css";
import Modal from "./Modal";

function ShoppingList({
  cart,
  updateCart,
  setIsOpen,

  modalcart,
  updateModalCart,
}) {
  const [activeCategory, setActiveCategory] = useState("");
  const [modal, setModal] = useState(false);

  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

  function addAndOpenModal(name, cover, text) {
    const modalPlant = modalcart.find((plant) => plant.name === name);
    if (modalPlant) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateModalCart([...cartFilteredCurrentPlant, { name, cover, text }]);
    } else if (modalPlant) {
      setModal(true);
    } else {
      updateModalCart([...modalcart, { name, cover, text }]);
    }
  }

  function addToCart(name, price, cover, text) {
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { name, price, cover, text, amount: currentPlantSaved.amount + 1 },
      ]);
    } else if (currentPlantSaved) {
      setIsOpen(true);
    } else {
      updateCart([...cart, { name, price, cover, text, amount: 1 }]);
    }
  }

  return (
    <div className="lmj-shopping-list">
      <Categories
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      <ul className="lmj-plant-list">
        {plantList.map(
          ({ id, cover, name, water, light, price, category, text }) =>
            !activeCategory || activeCategory === category ? (
              <div key={id}>
                <PlantItem
                  cover={cover}
                  name={name}
                  price={price}
                  water={water}
                  light={light}
                />
                <button
                  onClick={() => addToCart(name, price, cover, text)}
                  className="addB"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => addAndOpenModal(name, cover, text)}
                  className="addB"
                >
                  infos
                </button>
              </div>
            ) : null
        )}
      </ul>

      {modalcart.length > 0 ? (
        <div>
          <Modal
            modalcart={modalcart}
            setModal={setModal}
            modal={modal}
            updateModalCart={updateModalCart}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ShoppingList;
